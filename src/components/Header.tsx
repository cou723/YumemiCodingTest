import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Yumemi Coding Test
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
