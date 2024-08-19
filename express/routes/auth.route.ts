import express from "express";
import { OAuth2Client } from "google-auth-library";
import { authenticateUser } from "../controller/controller";
import jwt from "jsonwebtoken";
import User from "../models/userSchema";
const router = express.Router();

import user from "../models/userSchema";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
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

router.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        console.log("Verification error, " + verificationResponse.error);
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const users = await user.find({ email: profile?.email }).exec();
      const existsInDB = users.length > 0;

      if (!existsInDB) {
        console.log("user is not in database");
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }
      const payload: jwt.JwtPayload = { email: profile?.email };
      const secret: jwt.Secret = process.env.JWT_SECRET!;
      const signOptions: jwt.SignOptions = { expiresIn: "1h" };
      const tokenValue: string = jwt.sign(payload, secret, signOptions);
      res.status(201).json({
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
    res.status(500).json({
      message: error?.message || error,
    });
  }
});
//###########################################################################################
//
//
//###########################################################################################
router.post("/signup", async (req, res) => {
  console.log("in auth signUp route");
  try {
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const payload: jwt.JwtPayload = { email: profile?.email };
      const secret: jwt.Secret = process.env.JWT_SECRET!;
      const signOptions: jwt.SignOptions = { expiresIn: "1h" };
      const tokenValue: string = jwt.sign(payload, secret, signOptions);
      console.log("email delivered: " + profile?.email);
      const users = await user.find({ email: profile?.email }).exec();
      const existsInDB = users.length > 0;
      console.log(users);
      if (!existsInDB) {
        console.log("user is not in database attempting to create user ");
        const newUser = new User({
          given_name: profile?.given_name,
          family_name: profile?.family_name,
          email: profile?.email,
        });
        newUser
          .save()
          .then(function (user) {
            console.log("user: " + user + " saved");
            res.status(201).json({
              message: "Signup was successful",
              user: {
                given_name: profile?.given_name,
                family_name: profile?.family_name,
                email: profile?.email,
                token: tokenValue,
              },
            });
          })
          .catch(function (error) {
            console.log("error: " + error);
            res.status(500).json({
              message: "Signup was unsuccessful",
            });
          });
      } else {
        res.status(201).json({
          message: "You are already signed up.",
          user: {
            given_name: profile?.given_name,
            family_name: profile?.family_name,
            email: profile?.email,
            token: tokenValue,
          },
        });
      }
    }
  } catch (error) {
    console.log("token verification error.");
    res.status(500).json({
      message: "An error occurred. Registration failed.",
    });
  }
});

export default router;
