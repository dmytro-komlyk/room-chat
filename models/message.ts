import { Schema, model, models } from 'mongoose';

const MessageShema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    private: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    reactions: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message = models.Message || model('Message', MessageShema);

export default Message;
