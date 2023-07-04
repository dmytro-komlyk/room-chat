import { Schema, model, models } from 'mongoose';

const ChatShema = new Schema({
  user: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    image: { type: Schema.Types.ObjectId, ref: 'Image' },
    userName: {
      type: Schema.Types.String,
      required: true,
    },
    nickName: {
      type: Schema.Types.String,
    },
  },
  messages: { type: Array, default: [] },
});

const Chat = models?.Chat || model('Chat', ChatShema);

export default Chat;
