import { Schema, model, models } from 'mongoose';

const ChatShema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  messages: { type: Array, default: [] },
});

const Chat = models?.Chat || model('Chat', ChatShema);

export default Chat;
