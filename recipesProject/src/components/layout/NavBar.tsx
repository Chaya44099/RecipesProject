import { Typography } from '@mui/material';
import '../../styles/NavBar.css'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../user/UserReducer';

const NavBar = () => {
  const [user, userDispatch] = useContext(UserContext);
  return (
    <>
      <Typography variant="h6" color="inherit" component="div">
        <NavLink className={({ isActive }) => (isActive ? 'link active-link' : 'link')} to="/">
          Home
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? 'link active-link' : 'link')} to="/allrecipes" >
          Recipies
        </NavLink>

        <NavLink className={({ isActive }) => (isActive ? 'link active-link' : 'link')} to="/about">
          About
        </NavLink>
        {!(Object.keys(user).length === 0) &&
          <NavLink className={({ isActive }) => (isActive ? 'link active-link' : 'link')} to="/addrecipe">
            addrecipe
          </NavLink>}
      </Typography>
    </>
  );
};
export default NavBar;
