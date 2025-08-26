// src/components/Layout/Layout.js
import React, { useState } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip,
  Fade,
  Slide,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingBag as ProductsIcon,
  ListAlt as OrdersIcon,
  People as CustomersIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  Store as StoreIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css'; // We'll create this CSS file for animations

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Products', icon: <ProductsIcon />, path: '/products' },
  { text: 'Orders', icon: <OrdersIcon />, path: '/orders' },
  { text: 'Customers', icon: <CustomersIcon />, path: '/customers' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
];

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenu = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/login');
  };

  // Mock notifications data
  const notifications = [
    { id: 1, text: 'New order received', time: '5 min ago', read: false },
    { id: 2, text: 'Product low in stock', time: '1 hour ago', read: false },
    { id: 3, text: 'Weekly report ready', time: '2 hours ago', read: true },
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const drawer = (
    <Box className="sidebar" sx={{ 
      background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
      height: '100%',
      color: 'white',
    }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: [2],
          py: [2],
        }}
      >
        <Box display="flex" alignItems="center">
          <StoreIcon sx={{ 
            mr: 1, 
            color: '#FF9A50',
            fontSize: 28 
          }} />
          <Typography variant="h6" noWrap component="div" sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ShopPay Admin
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <ChevronLeftIcon className={open ? '' : 'rotate-icon'} />
        </IconButton>
      </Toolbar>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            className="menu-item"
            sx={{
              mb: 1,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&.Mui-selected': {
                background: 'linear-gradient(45deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
                color: 'white',
                boxShadow: '0 4px 10px rgba(249, 83, 198, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF9A50 30%, #F953C6 70%, #B91D73 100%)',
                },
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(255, 154, 80, 0.1)',
                transform: 'translateX(5px)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {item.icon}
            </ListItemIcon>
            <Fade in={open} timeout={300}>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: location.pathname === item.path ? 600 : 400 
                }} 
              />
            </Fade>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        className="app-bar"
        sx={{
          width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
          ml: { md: `${open ? drawerWidth : 0}px` },
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(90deg, #1a202c 0%, #2d3748 100%)',
          color: 'white',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          
          <Tooltip title="Notifications">
            <IconButton 
              size="large" 
              color="inherit" 
              onClick={handleNotificationsMenu}
              className="notification-btn"
            >
              <Badge badgeContent={unreadNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            id="notifications-menu"
            anchorEl={notificationsAnchorEl}
            keepMounted
            open={Boolean(notificationsAnchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <Box sx={{ width: 360, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <MenuItem 
                    key={notification.id} 
                    onClick={handleClose}
                    sx={{ 
                      backgroundColor: notification.read ? 'transparent' : 'rgba(255, 154, 80, 0.1)',
                      mb: 1,
                      borderRadius: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="body2">{notification.text}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {notification.time}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No notifications
                </Typography>
              )}
            </Box>
          </Menu>

          <Tooltip title="Account settings">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="avatar-btn"
            >
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  background: 'linear-gradient(45deg, #FF9A50 0%, #F953C6 50%, #B91D73 100%)',
                  transition: 'all 0.3s ease',
                }}
              >
                {user?.name?.charAt(0) || 'A'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: open ? drawerWidth : 0 }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
                color: 'white',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="persistent"
            open={open}
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
                color: 'white',
                border: 'none',
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        className="main-content"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${open ? drawerWidth : 0}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
          transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Box>
            {children}
          </Box>
        </Slide>
      </Box>
    </Box>
  );
};

export default Layout;