import userType from "./userType";

class userClass {
  includes(arg0: string): boolean {
    let returnVar: boolean = false;
    if (this.email.includes(arg0)) {
      return true;
    }
    if (this.firstName.includes(arg0)) {
      return true;
    }
    if (this.lastName.includes(arg0)) {
      return true;
    }
    if (this.picture.includes(arg0)) {
      return true;
    }
    return returnVar;
  }
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  constructor(userArgument: userType) {
    this.email = userArgument.email;
    this.firstName = userArgument.firstName;
    this.lastName = userArgument.lastName;
    this.picture = userArgument.picture;
  }
}

export default userClass;
