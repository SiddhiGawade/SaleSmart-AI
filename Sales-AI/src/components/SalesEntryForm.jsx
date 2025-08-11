import React, { useState } from 'react';
import { getToken } from '../api';

const initialState = {
  dateOfSale: '',
  productName: '',
  quantitySold: 1,
  totalSaleAmount: '',
  customerName: '',
  salespersonName: '',
  leadSource: 'Other',
  dealStatus: 'Pending',
};

const SalesEntryForm = ({ onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleNumber = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value === '' ? '' : Number(value) }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to save sale');
      setSuccess('Sale record saved!');
      setForm(initialState);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h3 className="col-span-full text-xl font-bold mb-2 text-blue-700">Add Sales Record</h3>
      {error && <div className="col-span-full text-red-500 text-sm">{error}</div>}
      {success && <div className="col-span-full text-green-600 text-sm">{success}</div>}
      <input name="dateOfSale" type="date" value={form.dateOfSale} onChange={handleChange} placeholder="Date of Sale" className="input" required />
      <input name="productName" value={form.productName} onChange={handleChange} placeholder="Product/Service Name" className="input" required />
      <input name="quantitySold" type="number" min="1" value={form.quantitySold} onChange={handleNumber} placeholder="Quantity Sold" className="input" required />
      <input name="totalSaleAmount" type="number" min="0" value={form.totalSaleAmount} onChange={handleNumber} placeholder="Total Sale Amount" className="input" required />
      <input name="customerName" value={form.customerName} onChange={handleChange} placeholder="Customer Name" className="input" required />
      <input name="salespersonName" value={form.salespersonName} onChange={handleChange} placeholder="Salesperson Name" className="input" required />
      <select name="leadSource" value={form.leadSource} onChange={handleChange} className="input">
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="Email">Email</option>
        <option value="Phone">Phone</option>
        <option value="Event">Event</option>
        <option value="Other">Other</option>
      </select>
      <select name="dealStatus" value={form.dealStatus} onChange={handleChange} className="input">
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
        <option value="Pending">Pending</option>
      </select>
      <button type="submit" className="col-span-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition" disabled={loading}>{loading ? 'Saving...' : 'Save Record'}</button>
    </form>
  );
};

export default SalesEntryForm;
