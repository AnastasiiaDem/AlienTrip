export {};
import mongoose, { Schema } from "mongoose";

interface IUser {
  _id: Schema.Types.ObjectId;
  name: {
    firstName: string;
    lastName: string;
  };
  birthDate?: Date;
  email: string;
  password: string;
  roles: Object;
}

export const UserSchema = new Schema<IUser>({
  _id: Schema.Types.ObjectId,
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: Date,
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Moderator: Number,
    Admin: Number,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
