import { NextApiRequest, NextApiResponse } from 'next';
import Room from '../models/room';

export const getRooms = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const rooms = await Room.find({});
    if (!rooms) return res.status(404).json({ error: 'Data not Found!' });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const postRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const formData = req.body;

    if (!formData)
      return res.status(404).json({ error: 'Form Data Not Provider!' });
    const data = await Room.create(formData);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const getRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ error: 'Room Not Found!' });
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const putRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const formData = req.body;

    if (id && formData) {
      const { _id } = await Room.findByIdAndUpdate(id, formData);
      const room = await Room.findById(_id);
      res.status(200).json(room);
    } else {
      res.status(404).json({ error: 'Room Not Selected' });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const deleteRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ error: 'Room Not Selected' });
    const { _id } = await Room.findByIdAndDelete(id);
    res.status(200).json({ deleted: _id });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
