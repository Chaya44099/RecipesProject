import { Box, Button, Modal, TextField } from "@mui/material";
import { useRef, useState, useContext, FormEvent } from "react";
import { style } from "./UpdateUser";
import { UserContext } from "./UserReducer";
import axios from "axios";
import HomePage from "./UpdateUser";

const Login = ({ sign, onError }: { sign: string, onError: () => void }) => {

    const url = "http://localhost:3000/api/user"
    const [user, userDispatch] = useContext(UserContext);
    const [modal, setModal] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                url + '/' + sign,
                {
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                });

            userDispatch({
                type: "CREATE",
                data: {
                    id: sign === 'login' ? res.data.user.id : res.data.userId,
                    password: passwordRef.current?.value || "",
                    email: emailRef.current?.value || "",
                    lastName: sign == 'login' ? res.data.user.lastName : '',
                    address: sign == 'login' ? res.data.user.address : '',
                    phone: sign == 'login' ? res.data.user.phone : '',
                    firstName: sign == 'login' ? res.data.user.firstName : ''
                },

            });
            setIsLogin(true)
            setModal(false);

        } catch (e: any) {

            if (e.response.status === 400) {
                alert('User is already logged in');
                onError();
            }
            if (e.response.status === 401) {
                alert("You must register");
                onError();
            }
        }
    }
    return (
        <>
            <Modal open={modal} >
                <Box sx={style} >
                    <form onSubmit={handleSubmit}>
                        <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                        <TextField label='userPassword' variant="filled" margin="normal" fullWidth inputRef={passwordRef} required />
                        <Button sx={{ marginTop: '2px',bgcolor:'#FF9900' }}  fullWidth variant="contained" type="submit">התחברות</Button>
                    </form>
                </Box>
            </Modal>

            {isLogin && <HomePage />}

        </>)
}
export default Login;