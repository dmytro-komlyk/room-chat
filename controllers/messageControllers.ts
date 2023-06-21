import { NextApiRequest, NextApiResponse } from 'next';
import Message from '../models/message';

export const getMessages = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const messages = await Message.find({});
    if (!messages) return res.status(404).json({ error: 'Data not Found!' });
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const postMessage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const formData = req.body;

    if (!formData)
      return res.status(404).json({ error: 'Form Data Not Provider!' });
    const data = await Message.create(formData);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const getMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ error: 'Message Not Found!' });
    const message = await Message.findById(id);
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const putMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const formData = req.body;

    if (id && formData) {
      const { _id } = await Message.findByIdAndUpdate(id, formData);
      const message = await Message.findById(_id);
      res.status(200).json(message);
    } else {
      res.status(404).json({ error: 'Message Not Selected' });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const deleteMessage = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ error: 'Message Not Selected' });
    const { _id } = await Message.findByIdAndDelete(id);
    res.status(200).json({ deleted: _id });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const putMessageReaction = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { messageId, isLike, reaction } = req.body;

    if (messageId && reaction) {
      const options = isLike
        ? { $set: { reactions: { ...reaction } } }
        : { $pull: { reactions: { id: reaction.id } } };
      const { _id } = await Message.findByIdAndUpdate(messageId, options);
      const message = await Message.findById(_id);
      res.status(200).json(message);
    } else {
      res.status(404).json({ error: 'Message Not Selected' });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};
