import { Schema, model, models } from 'mongoose';

const RoomShema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    image: { type: Schema.Types.ObjectId, ref: 'Image' },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contacts: { type: Array, default: [] },
    messages: { type: Array, default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Room = models?.Room || model('Room', RoomShema);

export default Room;
