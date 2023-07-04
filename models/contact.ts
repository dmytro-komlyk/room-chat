import { Schema, model, models } from 'mongoose';

const ContactShema = new Schema(
  {
    image: { type: Schema.Types.ObjectId, ref: 'Image' },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    contactId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userName: {
      type: Schema.Types.String,
      required: true,
    },
    nickName: {
      type: Schema.Types.String,
    },
    email: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = models?.Contact || model('Contact', ContactShema);

export default Contact;
