export {};
import mongoose, { Schema } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  roles: Object;
}

export const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: String,
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Moderator: Number,
    Admin: Number,
  },
});

const User = mongoose.model<IUser>("user", UserSchema);
export default User;
