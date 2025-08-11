import React, { useState, useEffect } from 'react';
import { getToken } from '../api';

const SalesTable = ({ refreshTrigger }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSales = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/sales', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to fetch sales data');
      const data = await res.json();
      setSales(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [refreshTrigger]);

  if (loading) return <div className="text-center py-8 text-slate-400">Loading sales data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (sales.length === 0) return <div className="text-center py-8 text-slate-400">No sales records found. Add your first sale below!</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-blue-700">Previous Sales Records</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Product</th>
              <th className="text-left p-2">Customer</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Salesperson</th>
              <th className="text-left p-2">Source</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id} className="border-b hover:bg-slate-50">
                <td className="p-2">{new Date(sale.dateOfSale).toLocaleDateString()}</td>
                <td className="p-2">{sale.productName}</td>
                <td className="p-2">{sale.customerName}</td>
                <td className="p-2">{sale.quantitySold}</td>
                <td className="p-2">${sale.totalSaleAmount}</td>
                <td className="p-2">{sale.salespersonName}</td>
                <td className="p-2">{sale.leadSource}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    sale.dealStatus === 'Won' ? 'bg-green-100 text-green-700' :
                    sale.dealStatus === 'Lost' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {sale.dealStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
