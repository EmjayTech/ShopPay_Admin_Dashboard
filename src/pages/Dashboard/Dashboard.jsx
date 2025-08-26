// src/pages/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Fab,
} from '@mui/material';
import {
  ShoppingCart,
  People,
  AttachMoney,
  TrendingUp,
  Inventory,
  Notifications,
  Refresh,
  Add,
} from '@mui/icons-material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import './Dashboard.css'; // We'll create this CSS file for animations

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 124563,
    totalOrders: 284,
    totalCustomers: 1265,
    totalProducts: 86
  });

  const [animatedStats, setAnimatedStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0
  });

  const recentOrders = [
    { id: '#ORD-2841', customer: 'John Doe', date: '2023-05-15', amount: '$125.00', status: 'Completed' },
    { id: '#ORD-2842', customer: 'Sarah Johnson', date: '2023-05-15', amount: '$85.50', status: 'Processing' },
    { id: '#ORD-2843', customer: 'Michael Brown', date: '2023-05-14', amount: '$234.99', status: 'Completed' },
    { id: '#ORD-2844', customer: 'Emily Wilson', date: '2023-05-14', amount: '$56.75', status: 'Shipped' },
    { id: '#ORD-2845', customer: 'Robert Davis', date: '2023-05-13', amount: '$189.99', status: 'Processing' },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
    { name: 'Jul', sales: 3490, revenue: 4300 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 35 },
    { name: 'Fashion', value: 25 },
    { name: 'Home & Kitchen', value: 20 },
    { name: 'Books', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#FF9A50', '#F953C6', '#B91D73', '#25D366', '#3498db'];

  // Animate stats counting up
  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const steps = 60; // Number of animation steps
    const interval = duration / steps;

    const counters = {
      totalSales: setCounter(stats.totalSales, 'totalSales', interval, steps),
      totalOrders: setCounter(stats.totalOrders, 'totalOrders', interval, steps),
      totalCustomers: setCounter(stats.totalCustomers, 'totalCustomers', interval, steps),
      totalProducts: setCounter(stats.totalProducts, 'totalProducts', interval, steps),
    };

    return () => {
      Object.values(counters).forEach(clearInterval);
    };
  }, []);

  const setCounter = (target, key, interval, steps) => {
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      const value = Math.round((target / steps) * step);
      setAnimatedStats(prev => ({ ...prev, [key]: value }));
      if (step === steps) clearInterval(timer);
    }, interval);
    return timer;
  };

  const StatCard = ({ title, value, icon, color, trend }) => (
    <Card className="stat-card" sx={{ height: '100%', background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)` }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" className="stat-value">
              {typeof value === 'string' ? value : value.toLocaleString()}
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

  const StatusChip = ({ status }) => {
    let color = 'default';
    if (status === 'Completed') color = 'success';
    if (status === 'Processing') color = 'warning';
    if (status === 'Shipped') color = 'primary';

    return <Chip label={status} color={color} size="small" sx={{ fontWeight: 'bold' }} />;
  };

  return (
    <Box className="dashboard-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom fontWeight="bold" className="shoppay-gradient-text">
          Dashboard
        </Typography>
        <Fab color="primary" size="medium" aria-label="refresh" sx={{ background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)' }}>
          <Refresh />
        </Fab>
      </Box>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={`$${animatedStats.totalSales.toLocaleString()}`}
            icon={<AttachMoney />}
            color="#FF9A50"
            trend={{ value: '+12%', color: '#FF9A50' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={animatedStats.totalOrders.toLocaleString()}
            icon={<ShoppingCart />}
            color="#F953C6"
            trend={{ value: '+8%', color: '#F953C6' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Customers"
            value={animatedStats.totalCustomers.toLocaleString()}
            icon={<People />}
            color="#B91D73"
            trend={{ value: '+5%', color: '#B91D73' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={animatedStats.totalProducts.toLocaleString()}
            icon={<Inventory />}
            color="#25D366"
            trend={{ value: '+3%', color: '#25D366' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
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
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="sales" stroke="#FF9A50" fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="revenue" stroke="#F953C6" fillOpacity={1} fill="url(#colorRevenue)" />
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper className="animated-card" sx={{ p: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
              Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#B91D73" 
                  strokeWidth={3} 
                  activeDot={{ r: 8, fill: '#B91D73' }} 
                  dot={{ fill: '#B91D73', strokeWidth: 2, r: 4 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#FF9A50" 
                  strokeWidth={3} 
                  activeDot={{ r: 8, fill: '#FF9A50' }} 
                  dot={{ fill: '#FF9A50', strokeWidth: 2, r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper className="animated-card" sx={{ p: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Recent Orders
              </Typography>
              <IconButton size="small" sx={{ background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)', color: 'white' }}>
                <Notifications />
              </IconButton>
            </Box>
            <List>
              {recentOrders.map((order, index) => (
                <ListItem key={order.id} divider className="order-item" sx={{ animationDelay: `${index * 0.1}s` }}>
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: 'transparent', 
                      background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)' 
                    }}>
                      <ShoppingCart sx={{ color: 'white' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight="bold">
                        {order.id}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary" display="block">
                          {order.customer}
                        </Typography>
                        {`${order.amount} • ${order.date}`}
                      </React.Fragment>
                    }
                  />
                  <StatusChip status={order.status} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Fab 
        color="primary" 
        aria-label="add" 
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
        <Add />
      </Fab>
    </Box>
  );
};

export default Dashboard;