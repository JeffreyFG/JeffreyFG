import express from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/userSchema";
const authRouter = express.Router();

import user from "../models/userSchema";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string | undefined = process.env.CLIENT_SECRET;
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

async function verifyGoogleToken(token: string): Promise<boolean> {
  try {
    await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function getPayload(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}
async function userIsInDatabase(email: string | undefined): Promise<boolean> {
  if (email) {
    const users = await user.find({ email: email }).exec();
    return users.length > 0;
  }
  return false;
}
async function updateTokenForUserGivenEmail(tokenValue: string, emailValue: string | undefined): Promise<boolean> {
  if (emailValue) {
    const filter = { email: emailValue };
    const update = { tokenString: tokenValue, tokenCreationDate: Date.now() };
    user.findOneAndUpdate(filter, update);
    return true;
  }
  return false;
}
//Simply verifying that a token is valid is not enough for full validation.
//
async function verifyGoogleEmail(token: string, email: string): Promise<boolean> {
  const verificationResponse = await getPayload(token);
  const profile = verificationResponse?.payload;
  return email === profile?.email;
}
authRouter.post("/canSignUp", async (request, response) => {
  const canSignUp: boolean = process.env.ACCEPTING_NEW_PROFILES === "true";
  response.status(200).json({ canSignUp: canSignUp });
});

//This post method receives from google the credential token of the user who is trying to login, the request is made by the browser to this endpoint.
// After receiving the credentials we verify there authenticity using the google provided auth client and the member function verifyIdToken
//
authRouter.post("/login", async (request, response) => {
  try {
    if (request.body.credential) {
      if (!(await verifyGoogleToken(request.body.credential))) {
        const verificationResponse = await getPayload(request.body.credential);
        console.log("Verification error, " + verificationResponse.error);
        return response.status(400).json({
          message: verificationResponse.error,
        });
      }
      const profile = (await getPayload(request.body.credential)).payload;

      if (await userIsInDatabase(profile?.email)) {
        console.log("user is not in database");
        return response.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }
      //If the user is in the database then we sign in.
      const payload: jwt.JwtPayload = { email: profile?.email };
      const secret: jwt.Secret = process.env.JWT_SECRET!;
      const signOptions: jwt.SignOptions = { expiresIn: "1h" };
      const tokenValue: string = jwt.sign(payload, secret, signOptions);
      updateTokenForUserGivenEmail(tokenValue, profile?.email);
      response.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: tokenValue,
        },
      });
    }
  } catch (error) {
    console.log("error in auth route" + error.message);
    response.status(500).json({
      message: error?.message || error,
    });
  }
});
//###########################################################################################
//
//
//###########################################################################################
authRouter.post("/signup", async (request, response) => {
  console.log("in auth signUp route");
  try {
    // console.log({ verified: verifyGoogleToken(request.body.credential) });
    if (request.body.credential) {
      const verificationResponse = await getPayload(request.body.credential);

      if (verificationResponse.error) {
        return response.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const payload: jwt.JwtPayload = { email: profile?.email };
      const secret: jwt.Secret = process.env.JWT_SECRET!;
      const signOptions: jwt.SignOptions = { expiresIn: "1h" };
      const tokenValue: string = jwt.sign(payload, secret, signOptions);
      const existsInDB: boolean = await userIsInDatabase(profile?.email);
      if (!existsInDB) {
        if (process.env.ACCEPTING_NEW_PROFILES === "true") {
          const newUser = new User({
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            tokenString: tokenValue,
            tokenCreationDate: Date.now(),
          });
          newUser
            .save()
            .then(function (user) {
              console.log("user: " + user + " saved");
              response.status(201).json({
                message: "Signup was successful",
                user: {
                  firstName: profile?.given_name,
                  lastName: profile?.family_name,
                  email: profile?.email,
                  token: tokenValue,
                },
              });
            })
            .catch(function (error) {
              console.log("error: " + error);
              response.status(500).json({
                message: "Signup was unsuccessful",
              });
            });
        } else {
          response.status(403).json({
            message: "Signup was unsuccessful not accepting new members",
          });
        }
      } else {
        updateTokenForUserGivenEmail(tokenValue, profile?.email);
        response.status(201).json({
          message: "You are already signed up.",
          user: {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            token: tokenValue,
          },
        });
      }
    }
  } catch (error) {
    console.log("token verification error.");
    response.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});

export { authRouter, verifyGoogleToken, verifyGoogleEmail };
