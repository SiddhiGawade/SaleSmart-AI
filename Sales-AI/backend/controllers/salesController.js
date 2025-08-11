import SalesRecord from '../models/SalesRecord.js';

export const getSales = async (req, res) => {
  const sales = await SalesRecord.find({ user: req.user.id });
  res.json(sales);
};

export const createSale = async (req, res) => {
  const sale = await SalesRecord.create({ ...req.body, user: req.user.id });
  res.status(201).json(sale);
};

export const updateSale = async (req, res) => {
  const sale = await SalesRecord.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!sale) return res.status(404).json({ message: 'Sale not found.' });
  res.json(sale);
};

export const deleteSale = async (req, res) => {
  const sale = await SalesRecord.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!sale) return res.status(404).json({ message: 'Sale not found.' });
  res.json({ message: 'Sale deleted.' });
};
