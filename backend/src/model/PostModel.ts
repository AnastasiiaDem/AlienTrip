export {};
import mongoose, { Schema } from "mongoose";

enum postType {
  help,
  needHelp,
}

interface IPost {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  type: String;
  categories: Array<string>;
  city: string;
  linkContacts?: {
    instagram: string;
    telegram: string;
  };
}

export const PostSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, require: true },
  type: { type: String, enum: postType, required: true },
  categories: [{ type: String, required: true }],
  city: { type: String, required: true },
  linkContacts: {
    instagram: String,
    telegram: String,
  },
});

const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;
