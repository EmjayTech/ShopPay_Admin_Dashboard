// src/pages/Analytics/Analytics.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Fab,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  Inventory,
  Refresh,
  DateRange,
  Download,
  FilterList,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('30days');
  const [animatedStats, setAnimatedStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    conversionRate: 0,
    avgOrderValue: 0
  });

  const stats = {
    totalRevenue: 124563,
    totalOrders: 284,
    conversionRate: 3.2,
    avgOrderValue: 438.6
  };

  // Sales data for charts
  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 2400, visitors: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398, visitors: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800, visitors: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908, visitors: 3908 },
    { name: 'May', sales: 1890, revenue: 4800, visitors: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800, visitors: 3800 },
    { name: 'Jul', sales: 3490, revenue: 4300, visitors: 4300 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Fashion', value: 25 },
    { name: 'Home & Kitchen', value: 20 },
    { name: 'Books', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const trafficData = [
    { name: 'Direct', value: 40 },
    { name: 'Social', value: 25 },
    { name: 'Email', value: 15 },
    { name: 'Organic', value: 20 },
  ];

  const COLORS = ['#FF9A50', '#F953C6', '#B91D73', '#25D366', '#3498db'];
  const TRAFFIC_COLORS = ['#FF9A50', '#F953C6', '#B91D73', '#3498db'];

  // Animate stats counting up
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const interval = duration / steps;

    const counters = {
      totalRevenue: setCounter(stats.totalRevenue, 'totalRevenue', interval, steps),
      totalOrders: setCounter(stats.totalOrders, 'totalOrders', interval, steps),
      conversionRate: setCounter(stats.conversionRate, 'conversionRate', interval, steps),
      avgOrderValue: setCounter(stats.avgOrderValue, 'avgOrderValue', interval, steps),
    };

    return () => {
      Object.values(counters).forEach(clearInterval);
    };
  }, []);

  const setCounter = (target, key, interval, steps) => {
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      const value = Math.round((target / steps) * step * 100) / 100;
      setAnimatedStats(prev => ({ ...prev, [key]: value }));
      if (step === steps) clearInterval(timer);
    }, interval);
    return timer;
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const StatCard = ({ title, value, icon, color, trend, prefix = '', suffix = '' }) => (
    <Card className="stat-card" sx={{ 
      height: '100%', 
      background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
      border: `1px solid ${color}30`,
    }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" className="stat-value">
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </Typography>
            {trend && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp sx={{ fontSize: 16, color: trend.color, mr: 0.5 }} />
                <Typography variant="caption" color={trend.color} fontWeight="bold">
                  {trend.value}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            className="stat-icon"
            sx={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
              borderRadius: '50%',
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: `0 4px 10px ${color}40`,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.95)' }} elevation={3}>
          <Typography variant="body2" fontWeight="bold" color="#FF9A50" gutterBottom>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box className="analytics-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" className="shoppay-gradient-text">
          Analytics Dashboard
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            select
            size="small"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            sx={{ minWidth: 120 }}
            className="filter-select"
          >
            <MenuItem value="7days">Last 7 Days</MenuItem>
            <MenuItem value="30days">Last 30 Days</MenuItem>
            <MenuItem value="90days">Last 90 Days</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </TextField>
          <Button
            variant="outlined"
            startIcon={<Download />}
            sx={{
              borderColor: '#FF9A50',
              color: '#FF9A50',
              '&:hover': {
                borderColor: '#F953C6',
                backgroundColor: 'rgba(255, 154, 80, 0.1)',
              },
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={animatedStats.totalRevenue}
            icon={<AttachMoney />}
            color="#FF9A50"
            trend={{ value: '+12.5%', color: '#FF9A50' }}
            prefix="$"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={animatedStats.totalOrders}
            icon={<ShoppingCart />}
            color="#F953C6"
            trend={{ value: '+8.2%', color: '#F953C6' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Conversion Rate"
            value={animatedStats.conversionRate}
            icon={<TrendingUp />}
            color="#B91D73"
            trend={{ value: '+3.1%', color: '#B91D73' }}
            suffix="%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg. Order Value"
            value={animatedStats.avgOrderValue}
            icon={<Inventory />}
            color="#25D366"
            trend={{ value: '+5.7%', color: '#25D366' }}
            prefix="$"
          />
        </Grid>
      </Grid>

      <Paper className="animated-card" sx={{ p: 2, mb: 2, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
            },
            '& .Mui-selected': {
              color: '#FF9A50 !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#FF9A50',
            }
          }}
        >
          <Tab label="Sales Overview" />
          <Tab label="Revenue Analysis" />
          <Tab label="Traffic Sources" />
          <Tab label="Product Performance" />
        </Tabs>
      </Paper>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className="animated-card" sx={{ p: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Sales Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9A50" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF9A50" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F953C6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F953C6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="sales" stroke="#FF9A50" fillOpacity={1} fill="url(#colorSales)" name="Sales" />
                  <Area type="monotone" dataKey="revenue" stroke="#F953C6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper className="animated-card" sx={{ p: 3, height: '100%', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Sales by Category
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="animated-card" sx={{ p: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#B91D73" 
                    strokeWidth={3} 
                    activeDot={{ r: 8, fill: '#B91D73' }} 
                    dot={{ fill: '#B91D73', strokeWidth: 2, r: 4 }} 
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#FF9A50" 
                    strokeWidth={3} 
                    activeDot={{ r: 8, fill: '#FF9A50' }} 
                    dot={{ fill: '#FF9A50', strokeWidth: 2, r: 4 }} 
                    name="Sales"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className="animated-card" sx={{ p: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Traffic Sources
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TRAFFIC_COLORS[index % TRAFFIC_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper className="animated-card" sx={{ p: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Visitor Statistics
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="visitors" fill="#3498db" name="Visitors" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="animated-card" sx={{ p: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                Product Performance
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="sales" fill="#FF9A50" name="Units Sold" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" fill="#F953C6" name="Revenue Generated" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Fab 
        color="primary" 
        aria-label="refresh" 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF9A50 30%, #F953C6 70%, #B91D73 100%)',
            boxShadow: '0 4px 15px 0 rgba(249, 83, 198, 0.5)',
          },
        }}
      >
        <Refresh />
      </Fab>
    </Box>
  );
};

export default Analytics;