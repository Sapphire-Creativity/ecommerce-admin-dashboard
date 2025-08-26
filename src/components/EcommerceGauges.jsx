import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const GaugeChart = ({ value, label, min = 0, max = 100, colors }) => {
  const data = [
    { name: 'filled', value: value - min },
    { name: 'remaining', value: max - value }
  ];

  const COLORS = colors || ['#0088FE', '#FF8042'];

  const centerLabel = {
    x: 50,
    y: 50,
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontSize: '24px',
    fontWeight: 'bold',
    fill: '#333'
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={180}
              endAngle={0}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell key="filled" fill={COLORS[0]} />
              <Cell key="remaining" fill={COLORS[1]} />
            </Pie>
            <Text {...centerLabel}>{`${value}%`}</Text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const EcommerceGauges = () => {
  // Sample eCommerce metrics data
  const metrics = [
    { 
      label: 'Conversion Rate', 
      value: 3.2, 
      min: 0, 
      max: 5,
      colors: ['#4CAF50', '#FFC107']
    },
    { 
      label: 'Inventory Level', 
      value: 68, 
      min: 0, 
      max: 100,
      colors: ['#2196F3', '#FF5722']
    },
    { 
      label: 'Customer Satisfaction', 
      value: 87, 
      min: 0, 
      max: 100,
      colors: ['#9C27B0', '#607D8B']
    },
    { 
      label: 'Cart Abandonment', 
      value: 42, 
      min: 0, 
      max: 100,
      colors: ['#F44336', '#CDDC39']
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Performance Metrics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <GaugeChart
            key={index}
            label={metric.label}
            value={metric.value}
            min={metric.min}
            max={metric.max}
            colors={metric.colors}
          />
        ))}
      </div>
      
      {/* Key Metrics Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600">Total Revenue</div>
          <div className="text-2xl font-bold">$24,589</div>
          <div className="text-xs text-green-500">↑ 12% from last month</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600">New Customers</div>
          <div className="text-2xl font-bold">1,243</div>
          <div className="text-xs text-green-500">↑ 8% from last month</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-purple-600">Avg. Order Value</div>
          <div className="text-2xl font-bold">$89.32</div>
          <div className="text-xs text-red-500">↓ 2% from last month</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-sm text-orange-600">Return Rate</div>
          <div className="text-2xl font-bold">4.2%</div>
          <div className="text-xs text-green-500">↓ 1.1% from last month</div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceGauges;