import { NextApiRequest, NextApiResponse } from 'next';
import Chat from '../models/chat';

export const getChats = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const chats = await Chat.find({});
    if (!chats) return res.status(404).json({ error: 'Data not Found!' });
    res.status(200).json(chats);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const postChat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const formData = req.body;

    if (!formData)
      return res.status(404).json({ error: 'Form Data Not Provider!' });
    const data = await Chat.create(formData);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const getChat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ error: 'Chat Not Found!' });
    const chat = await Chat.findById(id);
    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const putChat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const formData = req.body;

    if (id && formData) {
      const { _id } = await Chat.findByIdAndUpdate(id, formData);
      const chat = await Chat.findById(_id);
      res.status(200).json(chat);
    } else {
      res.status(404).json({ error: 'Chat Not Selected' });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const deleteChat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ error: 'Chat Not Selected' });
    const { _id } = await Chat.findByIdAndDelete(id);
    res.status(200).json({ deleted: _id });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
