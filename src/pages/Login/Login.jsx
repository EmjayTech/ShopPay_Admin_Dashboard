// src/pages/Login/Login.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LockOutlined as LockOutlinedIcon,
  ShoppingBag as ShoppingBagIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css'; // We'll create this CSS file for animations

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="login-container">
      {/* Animated background elements */}
      <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="gradient-bg"></div>
      </div>

      <Paper
        elevation={10}
        className="login-paper"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <ShoppingBagIcon sx={{ fontSize: 32, color: '#FF9A50', mr: 1 }} />
          <Typography variant="h4" component="h1" fontWeight="bold" className="shoppay-gradient-text">
            ShopPay
          </Typography>
        </Box>
        
        <Typography variant="h5" component="h2" gutterBottom fontWeight="600" color="text.primary">
          Admin Dashboard
        </Typography>
        
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Sign in to access the admin panel
        </Typography>

        <Avatar sx={{ m: 1, bgcolor: 'transparent', width: 56, height: 56, border: '2px solid #FF9A50' }}>
          <LockOutlinedIcon sx={{ color: '#FF9A50' }} />
        </Avatar>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#FF9A50',
                },
              },
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#FF9A50',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              background: 'linear-gradient(45deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF9A50 30%, #F953C6 70%, #B91D73 100%)',
                boxShadow: '0 4px 15px 0 rgba(249, 83, 198, 0.5)',
              },
              transition: 'all 0.3s ease',
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Sign In'
            )}
          </Button>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Demo credentials: admin@shoppay.com / password
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;