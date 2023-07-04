import { Schema, model, models } from 'mongoose';

const ImageSchema = new Schema(
  {
    name: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Image = models?.ImageSchema || model('Image', ImageSchema);

export default Image;
