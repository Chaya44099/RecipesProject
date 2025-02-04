import { Box, Button, Grid2 } from "@mui/material";
import { useState } from "react"
import LoggedIn from "./Login";



const LoginButtens = () => {


   const [isLogin, setIsLogin] = useState(false);
   const [sign, setSign] = useState("");

   const handleChange = (signInOrUp: string) => {
      setIsLogin(!isLogin);
      setSign(signInOrUp);
   }
   return (
      <>
         {!isLogin ?
            <Box >
               <Grid2 >
                  <> <Button variant="contained" sx={{ backgroundColor: '#FFC107', color: '#fff' }} onClick={() => handleChange('login')} >sign in </Button>
                     <Button variant="contained" sx={{ backgroundColor: '#FF9900', color: '#fff' }} onClick={() => handleChange('register')}> sign up </Button>

                  </>
               </Grid2>
            </Box>
            : <LoggedIn sign={sign} onError={() => setIsLogin(false)} />}
      </>
   )
}
export default LoginButtens;