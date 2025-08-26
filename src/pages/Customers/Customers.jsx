// src/pages/Customers/Customers.js
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
  Tooltip,
  Badge,
  Tabs,
  Tab,
  Rating,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  PersonAdd as PersonAddIcon,
  Loyalty as LoyaltyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Customers.css';

const Customers = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [animatedStats, setAnimatedStats] = useState({
    totalCustomers: 0,
    newCustomers: 0,
    activeCustomers: 0,
    loyalCustomers: 0
  });
  const navigate = useNavigate();

  const stats = {
    totalCustomers: 1265,
    newCustomers: 42,
    activeCustomers: 987,
    loyalCustomers: 236
  };

  // Mock data for demonstration
  const customers = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      phone: '+1 (555) 123-4567', 
      location: 'New York, USA', 
      joinDate: '2023-05-15', 
      orders: 12, 
      spent: '$1250.00', 
      status: 'Active', 
      rating: 4.5,
      avatar: '/avatars/1.jpg'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@example.com', 
      phone: '+1 (555) 987-6543', 
      location: 'Los Angeles, USA', 
      joinDate: '2023-05-10', 
      orders: 8, 
      spent: '$856.50', 
      status: 'Active', 
      rating: 4.2,
      avatar: '/avatars/2.jpg'
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      email: 'michael.b@example.com', 
      phone: '+1 (555) 456-7890', 
      location: 'Chicago, USA', 
      joinDate: '2023-04-28', 
      orders: 15, 
      spent: '$2349.99', 
      status: 'Loyal', 
      rating: 4.8,
      avatar: '/avatars/3.jpg'
    },
    { 
      id: 4, 
      name: 'Emily Wilson', 
      email: 'emily.w@example.com', 
      phone: '+1 (555) 321-6547', 
      location: 'Miami, USA', 
      joinDate: '2023-05-14', 
      orders: 3, 
      spent: '$256.75', 
      status: 'New', 
      rating: 4.0,
      avatar: '/avatars/4.jpg'
    },
    { 
      id: 5, 
      name: 'Robert Davis', 
      email: 'robert.d@example.com', 
      phone: '+1 (555) 654-3210', 
      location: 'Seattle, USA', 
      joinDate: '2023-05-05', 
      orders: 7, 
      spent: '$1189.99', 
      status: 'Active', 
      rating: 4.3,
      avatar: '/avatars/5.jpg'
    },
    { 
      id: 6, 
      name: 'Jennifer Lee', 
      email: 'jennifer.l@example.com', 
      phone: '+1 (555) 789-0123', 
      location: 'San Francisco, USA', 
      joinDate: '2023-04-20', 
      orders: 22, 
      spent: '$3450.50', 
      status: 'Loyal', 
      rating: 4.9,
      avatar: '/avatars/6.jpg'
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'active', label: 'Active' },
    { value: 'loyal', label: 'Loyal' },
    { value: 'inactive', label: 'Inactive' },
  ];

  // Animate stats counting up
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const interval = duration / steps;

    const counters = {
      totalCustomers: setCounter(stats.totalCustomers, 'totalCustomers', interval, steps),
      newCustomers: setCounter(stats.newCustomers, 'newCustomers', interval, steps),
      activeCustomers: setCounter(stats.activeCustomers, 'activeCustomers', interval, steps),
      loyalCustomers: setCounter(stats.loyalCustomers, 'loyalCustomers', interval, steps),
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
    let bgColor = 'default';
    
    if (status === 'Active') {
      color = 'success';
      bgColor = 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)';
    } else if (status === 'New') {
      color = 'warning';
      bgColor = 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)';
    } else if (status === 'Loyal') {
      color = 'primary';
      bgColor = 'linear-gradient(135deg, #2196f3 0%, #0d47a1 100%)';
    } else if (status === 'Inactive') {
      color = 'error';
      bgColor = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
    }

    return (
      <Chip 
        label={status} 
        size="small" 
        sx={{ 
          fontWeight: 'bold',
          background: bgColor,
          color: 'white',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
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

  const handleViewCustomer = (customerId) => {
    navigate(`/customers/${customerId}`);
  };

  const getAvatarColor = (name) => {
    const colors = ['#FF9A50', '#F953C6', '#B91D73', '#2196f3', '#4caf50', '#ff9800'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Box className="customers-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" className="shoppay-gradient-text">
          Customers
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          sx={{
            background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #FF9A50 30%, #F953C6 70%, #B91D73 100%)',
              boxShadow: '0 4px 15px 0 rgba(249, 83, 198, 0.5)',
            },
          }}
        >
          Add Customer
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Customers"
            value={animatedStats.totalCustomers}
            icon={<PersonAddIcon />}
            color="#FF9A50"
            trend={{ value: '+15%', color: '#FF9A50' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Customers"
            value={animatedStats.newCustomers}
            icon={<PersonAddIcon />}
            color="#2196f3"
            trend={{ value: '+8%', color: '#2196f3' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Customers"
            value={animatedStats.activeCustomers}
            icon={<PersonAddIcon />}
            color="#4caf50"
            trend={{ value: '+12%', color: '#4caf50' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Loyal Customers"
            value={animatedStats.loyalCustomers}
            icon={<LoyaltyIcon />}
            color="#B91D73"
            trend={{ value: '+20%', color: '#B91D73' }}
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
            <Tab label="All Customers" />
            <Tab label="New" />
            <Tab label="Active" />
            <Tab label="Loyal" />
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
              placeholder="Search customers..."
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
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Join Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Orders</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Total Spent</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rating</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow 
                key={customer.id} 
                className="customer-row"
                sx={{ 
                  '&:nth-of-type(even)': { 
                    backgroundColor: 'rgba(255, 154, 80, 0.03)' 
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 154, 80, 0.08)'
                  }
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar 
                      sx={{ 
                        bgcolor: getAvatarColor(customer.name),
                        mr: 2,
                        width: 40,
                        height: 40
                      }}
                    >
                      {customer.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">{customer.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{customer.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{customer.phone}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: '#FF9A50' }} />
                    <Typography variant="body2">{customer.location}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{customer.joinDate}</TableCell>
                <TableCell>
                  <Badge badgeContent={customer.orders} color="primary" max={999}>
                    <Typography fontWeight="bold" color="primary">
                      {customer.orders}
                    </Typography>
                  </Badge>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#4caf50' }}>{customer.spent}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Rating
                      value={customer.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                      emptyIcon={<StarIcon style={{ opacity: 0.5 }} />}
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {customer.rating}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <StatusChip status={customer.status} />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Profile">
                    <IconButton 
                      size="small" 
                      className="action-btn" 
                      sx={{ color: '#2196f3', '&:hover': { backgroundColor: '#2196f320' } }}
                      onClick={() => handleViewCustomer(customer.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Send Email">
                    <IconButton 
                      size="small" 
                      className="action-btn" 
                      sx={{ color: '#FF9A50', '&:hover': { backgroundColor: '#FF9A5020' } }}
                    >
                      <EmailIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Customer">
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
          Load More Customers
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

export default Customers;