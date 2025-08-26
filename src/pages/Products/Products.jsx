// src/pages/Products/Products.js
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
  Slide,
  Fade,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Inventory as InventoryIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import './Products.css'; // We'll create this CSS file for animations

const Products = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [animatedStats, setAnimatedStats] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0
  });

  // Mock data for demonstration
  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$129.99', stock: 45, status: 'In Stock', sales: 124 },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: '$199.99', stock: 12, status: 'Low Stock', sales: 89 },
    { id: 3, name: 'Running Shoes', category: 'Fashion', price: '$79.99', stock: 67, status: 'In Stock', sales: 203 },
    { id: 4, name: 'Coffee Maker', category: 'Home & Kitchen', price: '$49.99', stock: 0, status: 'Out of Stock', sales: 56 },
    { id: 5, name: 'Bluetooth Speaker', category: 'Electronics', price: '$59.99', stock: 23, status: 'In Stock', sales: 178 },
    { id: 6, name: 'Yoga Mat', category: 'Fitness', price: '$29.99', stock: 34, status: 'In Stock', sales: 92 },
    { id: 7, name: 'Desk Lamp', category: 'Home & Kitchen', price: '$39.99', stock: 3, status: 'Low Stock', sales: 67 },
    { id: 8, name: 'Water Bottle', category: 'Fitness', price: '$24.99', stock: 0, status: 'Out of Stock', sales: 145 },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Kitchen' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'books', label: 'Books' },
  ];

  const stats = {
    totalProducts: 86,
    inStock: 64,
    lowStock: 12,
    outOfStock: 10
  };

  // Animate stats counting up
  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const interval = duration / steps;

    const counters = {
      totalProducts: setCounter(stats.totalProducts, 'totalProducts', interval, steps),
      inStock: setCounter(stats.inStock, 'inStock', interval, steps),
      lowStock: setCounter(stats.lowStock, 'lowStock', interval, steps),
      outOfStock: setCounter(stats.outOfStock, 'outOfStock', interval, steps),
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

  const StatusChip = ({ status }) => {
    let color = 'default';
    let bgColor = 'default';
    
    if (status === 'In Stock') {
      color = 'success';
      bgColor = 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)';
    } else if (status === 'Low Stock') {
      color = 'warning';
      bgColor = 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)';
    } else if (status === 'Out of Stock') {
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

  const StatCard = ({ title, value, icon, color }) => (
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="products-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" className="shoppay-gradient-text">
          Products
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleClickOpen}
          sx={{
            background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #FF9A50 30%, #F953C6 70%, #B91D73 100%)',
              boxShadow: '0 4px 15px 0 rgba(249, 83, 198, 0.5)',
            },
          }}
        >
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={animatedStats.totalProducts}
            icon={<InventoryIcon />}
            color="#FF9A50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="In Stock"
            value={animatedStats.inStock}
            icon={<InventoryIcon />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Low Stock"
            value={animatedStats.lowStock}
            icon={<InventoryIcon />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Out of Stock"
            value={animatedStats.outOfStock}
            icon={<InventoryIcon />}
            color="#f44336"
          />
        </Grid>
      </Grid>

      <Paper className="animated-card" sx={{ p: 2, mb: 2, background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <TextField
            select
            size="small"
            defaultValue="all"
            sx={{ minWidth: 180 }}
            className="category-select"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            placeholder="Search products..."
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
      </Paper>

      <TableContainer component={Paper} className="animated-card" sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stock</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sales</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow 
                key={product.id} 
                className="product-row"
                sx={{ 
                  '&:nth-of-type(even)': { 
                    backgroundColor: 'rgba(255, 154, 80, 0.03)' 
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 154, 80, 0.08)'
                  }
                }}
              >
                <TableCell sx={{ fontWeight: 'bold' }}>{product.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={product.category} 
                    size="small" 
                    sx={{ 
                      background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
                      color: 'white',
                      fontWeight: 'bold'
                    }} 
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#FF9A50' }}>{product.price}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box 
                      sx={{ 
                        width: 60, 
                        height: 8, 
                        backgroundColor: '#e0e0e0', 
                        borderRadius: 4, 
                        overflow: 'hidden',
                        mr: 1
                      }}
                    >
                      <Box 
                        sx={{ 
                          height: '100%', 
                          backgroundColor: product.stock > 20 ? '#4caf50' : product.stock > 5 ? '#ff9800' : '#f44336',
                          width: `${(product.stock / 70) * 100}%`,
                          transition: 'width 0.5s ease'
                        }} 
                      />
                    </Box>
                    {product.stock}
                  </Box>
                </TableCell>
                <TableCell>
                  <StatusChip status={product.status} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <TrendingUpIcon sx={{ color: '#4caf50', mr: 0.5, fontSize: 18 }} />
                    {product.sales}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" className="action-btn" sx={{ color: '#2196f3', '&:hover': { backgroundColor: '#2196f320' } }}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" className="action-btn" sx={{ color: '#FF9A50', '&:hover': { backgroundColor: '#FF9A5020' } }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" className="action-btn" sx={{ color: '#f44336', '&:hover': { backgroundColor: '#f4433620' } }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        TransitionComponent={Slide}
        transitionDuration={400}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)', 
          color: 'white',
          fontWeight: 'bold'
        }}>
          Add New Product
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Product Name" 
                variant="outlined" 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF9A50',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Description" 
                variant="outlined" 
                multiline 
                rows={3} 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF9A50',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Price" 
                variant="outlined" 
                type="number" 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF9A50',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Stock" 
                variant="outlined" 
                type="number" 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF9A50',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Category" 
                variant="outlined" 
                select
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF9A50',
                    },
                  },
                }}
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="home">Home & Kitchen</MenuItem>
                <MenuItem value="books">Books</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="Status" 
                variant="outlined" 
                select
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF9A50',
                    },
                  },
                }}
              >
                <MenuItem value="in-stock">In Stock</MenuItem>
                <MenuItem value="low-stock">Low Stock</MenuItem>
                <MenuItem value="out-of-stock">Out of Stock</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#64748b' }}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleClose}
            sx={{
              background: 'linear-gradient(135deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #FF9A50 30%, #F953C6 70%, #B91D73 100%)',
                boxShadow: '0 4px 15px 0 rgba(249, 83, 198, 0.5)',
              },
            }}
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

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

// Custom TrendingUp icon with gradient
const TrendingUpIcon = ({ sx }) => (
  <Box
    sx={{
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...sx
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  </Box>
);

export default Products;