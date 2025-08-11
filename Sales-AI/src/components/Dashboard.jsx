import React, { useState } from 'react';
import SalesEntryForm from './SalesEntryForm';
import SalesCharts from './SalesCharts';
import SalesTable from './SalesTable';

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSaleAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="p-0 md:p-6">
      <h2 className="text-3xl font-bold mb-8 text-slate-800">Sales Dashboard</h2>
      
      {/* Charts for Analytics */}
      <SalesCharts refreshTrigger={refreshTrigger} />
      
      {/* Table for Detailed Linear Data View */}
      <SalesTable refreshTrigger={refreshTrigger} />
      
      {/* Form for Adding New Sales */}
      <SalesEntryForm onSuccess={handleSaleAdded} />
    </div>
  );
};

export default Dashboard;
