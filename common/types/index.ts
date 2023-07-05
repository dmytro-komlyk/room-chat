export interface IUser {
  _id?: string;
  email: string;
  userName: string;
}

export interface ILoginUserParams {
  email: string;
  password: string;
}

export interface IRegisterUserParams {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IImage {
  name: String;
  img: Buffer;
}

export interface IContact {
  _id: String;
  image: IImage;
  userId: String;
  userName: String;
  nickName: String;
  email: String;
}

export interface IReaction {}

export interface IMessage {
  ownerId: String;
  private: Boolean;
  text: String;
  reactions: Array<IReaction>;
  createdAt: String;
  updatedAt: String;
}

export interface IRoom {
  _id?: String;
  ownerId: String;
  image?: String;
  title: String;
  description: String;
  contacts: Array<IContact>;
  messages: Array<IMessage>;
  createdAt: String;
  updatedAt: String;
}

export interface IChat {
  _id?: String;
  user: {
    id: string;
    image: IImage;
    userName: string;
    nickName: string;
  };
  messages: Array<IMessage>;
}
