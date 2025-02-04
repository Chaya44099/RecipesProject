import { AppBar, Grid2, Toolbar } from "@mui/material";
import Login from "../user/LoginButtens";
import NavBar from "./NavBar";
import '../../styles/AppLayout.css'
import { Outlet } from "react-router-dom";
const AppLayout = () => {
    return (<>
     
         {<AppBar sx={{ bgcolor: '#F7DC6F', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Toolbar sx={{ justifyContent: "space-between", padding: 0, margin: 0 }}>
                <Grid2
                    container
                    justifyContent="flex-end"
                    alignItems="center" >
                    <Login />
                </Grid2>
                <Grid2 >
                    <NavBar />
                </Grid2>
            </Toolbar>
        </AppBar >
        }
         <Outlet />
        
    </>)
}
export default AppLayout;