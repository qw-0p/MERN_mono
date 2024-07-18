import mongoose from "mongoose";
import User from './User'
interface IPost {
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: mongoose.Types.ObjectId;
  imageUrl: string;
}

const PostSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: [],
    default: []
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  imageUrl: String
}, {
  timestamps: true
})

export default mongoose.model('Post', PostSchema)
