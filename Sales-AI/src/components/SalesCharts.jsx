import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { getToken } from '../api';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const SalesCharts = ({ refreshTrigger }) => {
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

  // Process data for charts
  const salesByDate = sales.reduce((acc, sale) => {
    const date = new Date(sale.dateOfSale).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.amount += sale.totalSaleAmount || 0;
      existing.count += 1;
    } else {
      acc.push({ date, amount: sale.totalSaleAmount || 0, count: 1 });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  const salesByStatus = sales.reduce((acc, sale) => {
    const existing = acc.find(item => item.status === sale.dealStatus);
    if (existing) {
      existing.count += 1;
      existing.amount += sale.totalSaleAmount || 0;
    } else {
      acc.push({ status: sale.dealStatus, count: 1, amount: sale.totalSaleAmount || 0 });
    }
    return acc;
  }, []);

  const salesByProduct = sales.reduce((acc, sale) => {
    const existing = acc.find(item => item.product === sale.productName);
    if (existing) {
      existing.count += 1;
      existing.amount += sale.totalSaleAmount || 0;
    } else {
      acc.push({ product: sale.productName, count: 1, amount: sale.totalSaleAmount || 0 });
    }
    return acc;
  }, []).slice(0, 10); // Top 10 products

  const salesBySource = sales.reduce((acc, sale) => {
    const existing = acc.find(item => item.source === sale.leadSource);
    if (existing) {
      existing.count += 1;
      existing.amount += sale.totalSaleAmount || 0;
    } else {
      acc.push({ source: sale.leadSource, count: 1, amount: sale.totalSaleAmount || 0 });
    }
    return acc;
  }, []);

  return (
    <div className="space-y-8 mb-8">
      <h3 className="text-xl font-bold text-blue-700">Sales Analytics</h3>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-100 to-white rounded-xl p-4 shadow">
          <h4 className="text-blue-700 text-sm font-semibold">Total Sales</h4>
          <p className="text-2xl font-bold text-slate-800">{sales.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-white rounded-xl p-4 shadow">
          <h4 className="text-green-700 text-sm font-semibold">Total Revenue</h4>
          <p className="text-2xl font-bold text-slate-800">${sales.reduce((sum, sale) => sum + (sale.totalSaleAmount || 0), 0).toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-100 to-white rounded-xl p-4 shadow">
          <h4 className="text-yellow-700 text-sm font-semibold">Won Deals</h4>
          <p className="text-2xl font-bold text-slate-800">{sales.filter(s => s.dealStatus === 'Won').length}</p>
        </div>
        <div className="bg-gradient-to-br from-violet-100 to-white rounded-xl p-4 shadow">
          <h4 className="text-violet-700 text-sm font-semibold">Avg Deal Size</h4>
          <p className="text-2xl font-bold text-slate-800">${Math.round(sales.reduce((sum, sale) => sum + (sale.totalSaleAmount || 0), 0) / sales.length).toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Sales Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Status Distribution */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Deal Status</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {salesByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Top Products</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByProduct}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">Lead Sources</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesBySource}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {salesBySource.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SalesCharts;
