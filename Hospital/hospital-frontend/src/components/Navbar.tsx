import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserCircleIcon } from "@heroicons/react/24/solid";


const pages = ['Home', 'Departments', 'Location', 'About', 'Contact Us'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (page: string) => {
    const route = `/${page.toLowerCase()}`;
    navigate(route);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" className="bg-black !shadow-none">
      <Container maxWidth="xl" className='bg-black'>
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/home"
            className="mr-2 hidden md:flex font-mono tracking-wide text-white text-xl font-bold no-underline bg-transparent"
          >
            MediSync
          </Typography>

          {/* Mobile View */}
          <Box className="flex flex-grow md:hidden">
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              className="text-white"
            >
              ☰
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="block md:hidden bg-blue-700"
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)} className="bg-blue-700 hover:bg-blue-900">
                  <Typography className="text-center text-white text-xl font-bold">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Navigation */}
          <Box className="hidden md:flex flex-grow gap-20 justify-center">
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                className="mx-2 my-2 text-black font-semibold px-4 py-2 rounded-md transition duration-300"
              >
                <span className="text-white">{page}</span> {/* Force text color */}
              </Button>
            ))}
          </Box>


          {/* User Menu */}
          <Box className="flex-grow-0">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} className="text-black">
                <UserCircleIcon className="h-10 w-10 text-white" />;
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleNavigate(setting)} className="hover:bg-blue-900">
                  <Typography className="text-center text-black">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
