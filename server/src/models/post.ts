 import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
  imageUrl: string;
  publicId: string;
  caption?: string;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PostSchema = new Schema<IImage>(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      trim: true,
      default: '',
    },

    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model<IImage>('Image', PostSchema);

export default Image;