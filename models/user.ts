import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    image: { type: Schema.Types.ObjectId, ref: 'Image' },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
        'Invalid email address',
      ],
    },
    userName: {
      type: String,
      required: [true, 'Full name is required'],
      minLength: [4, 'Full name should be atleast 4 characters long'],
      maxLength: [30, 'Full name should be less than 30 characters'],
    },
    nickName: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    contacts: {
      type: Array,
      default: [],
    },
    chats: {
      type: Array,
      default: [],
    },
    rooms: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = models?.User || model('User', UserSchema);

export default User;
