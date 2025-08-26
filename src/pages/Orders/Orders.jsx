// src/pages/Orders/Orders.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Fab,
  Avatar,
  AvatarGroup,
  Tooltip,
  Badge,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [animatedStats, setAnimatedStats] = useState({
    totalOrders: 0,
    pending: 0,
    processing: 0,
    completed: 0
  });
  const navigate = useNavigate();

  const stats = {
    totalOrders: 284,
    pending: 42,
    processing: 87,
    completed: 155
  };

  // Mock data for demonstration
  const orders = [
    { id: '#ORD-2841', customer: 'John Doe', date: '2023-05-15', amount: '$125.00', status: 'Completed', items: 3 },
    { id: '#ORD-2842', customer: 'Sarah Johnson', date: '2023-05-15', amount: '$85.50', status: 'Processing', items: 2 },
    { id: '#ORD-2843', customer: 'Michael Brown', date: '2023-05-14', amount: '$234.99', status: 'Completed', items: 5 },
    { id: '#ORD-2844', customer: 'Emily Wilson', date: '2023-05-14', amount: '$56.75', status: 'Shipped', items: 1 },
    { id: '#ORD-2845', customer: 'Robert Davis', date: '2023-05-13', amount: '$189.99', status: 'Processing', items: 4 },
    { id: '#ORD-2846', customer: 'Jennifer Lee', date: '2023-05-13', amount: '$78.25', status: 'Pending', items: 2 },
    { id: '#ORD-2847', customer: 'David Wilson', date: '2023-05-12', amount: '$345.50', status: 'Completed', items: 6 },
    { id: '#ORD-2848', customer: 'Maria Garcia', date: '2023-05-12', amount: '$92.99', status: 'Shipped', items: 3 },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  // Animate stats counting up
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const interval = duration / steps;

    const counters = {
      totalOrders: setCounter(stats.totalOrders, 'totalOrders', interval, steps),
      pending: setCounter(stats.pending, 'pending', interval, steps),
      processing: setCounter(stats.processing, 'processing', interval, steps),
      completed: setCounter(stats.completed, 'completed', interval, steps),
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const StatusChip = ({ status }) => {
    let color = 'default';
    let icon = <PendingIcon />;
    
    if (status === 'Completed') {
      color = 'success';
      icon = <CompletedIcon />;
    } else if (status === 'Processing') {
      color = 'warning';
      icon = <PendingIcon />;
    } else if (status === 'Shipped') {
      color = 'primary';
      icon = <ShippingIcon />;
    } else if (status === 'Pending') {
      color = 'default';
      icon = <PendingIcon />;
    }

    return (
      <Chip 
        icon={icon}
        label={status} 
        size="small" 
        color={color}
        sx={{ 
          fontWeight: 'bold',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }} 
      />
    );
  };

  const StatCard = ({ title, value, icon, color, trend }) => (
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
              {value.toLocaleString()}
            </Typography>
            {trend && (
              <Box display="flex" alignItems="center" mt={1}>
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

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <Box className="orders-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" className="shoppay-gradient-text">
          Orders
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />}
          sx={{
            background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #FF9A50 30%, #F953C6 70%, #B91D73 100%)',
              boxShadow: '0 4px 15px 0 rgba(249, 83, 198, 0.5)',
            },
          }}
        >
          Export Orders
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={animatedStats.totalOrders}
            icon={<CartIcon />}
            color="#FF9A50"
            trend={{ value: '+12%', color: '#FF9A50' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={animatedStats.pending}
            icon={<PendingIcon />}
            color="#ff9800"
            trend={{ value: '+5%', color: '#ff9800' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Processing"
            value={animatedStats.processing}
            icon={<ShippingIcon />}
            color="#2196f3"
            trend={{ value: '+8%', color: '#2196f3' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={animatedStats.completed}
            icon={<CompletedIcon />}
            color="#4caf50"
            trend={{ value: '+15%', color: '#4caf50' }}
          />
        </Grid>
      </Grid>

      <Paper className="animated-card" sx={{ p: 2, mb: 2, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
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
            <Tab label="All Orders" />
            <Tab label="Pending" />
            <Tab label="Processing" />
            <Tab label="Completed" />
          </Tabs>
          
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 140 }}
              className="filter-select"
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              size="small"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF9A50',
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper} className="animated-card" sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Order ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Items</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow 
                key={order.id} 
                className="order-row"
                sx={{ 
                  '&:nth-of-type(even)': { 
                    backgroundColor: 'rgba(255, 154, 80, 0.03)' 
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 154, 80, 0.08)'
                  }
                }}
              >
                <TableCell sx={{ fontWeight: 'bold', color: '#FF9A50' }}>{order.id}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge badgeContent={order.items} color="primary">
                    <CartIcon color="action" />
                  </Badge>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#4caf50' }}>{order.amount}</TableCell>
                <TableCell>
                  <StatusChip status={order.status} />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Order">
                    <IconButton 
                      size="small" 
                      className="action-btn" 
                      sx={{ color: '#2196f3', '&:hover': { backgroundColor: '#2196f320' } }}
                      onClick={() => handleViewOrder(order.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Order">
                    <IconButton 
                      size="small" 
                      className="action-btn" 
                      sx={{ color: '#FF9A50', '&:hover': { backgroundColor: '#FF9A5020' } }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Order">
                    <IconButton 
                      size="small" 
                      className="action-btn" 
                      sx={{ color: '#f44336', '&:hover': { backgroundColor: '#f4433620' } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={3}>
        <Button 
          variant="outlined"
          sx={{
            borderColor: '#FF9A50',
            color: '#FF9A50',
            '&:hover': {
              borderColor: '#F953C6',
              backgroundColor: 'rgba(255, 154, 80, 0.1)',
            },
          }}
        >
          Load More Orders
        </Button>
      </Box>

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
        <RefreshIcon />
      </Fab>
    </Box>
  );
};

export default Orders;