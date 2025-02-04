import { Avatar, Box, Button, Grid, Grid2, Modal, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./UserReducer";
import axios from "axios";
export const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};
const UpdateUser = () => {
    const [modal, setModal] = useState(false);
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const [user, userDispatch] = useContext(UserContext);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                "http://localhost:3000/api/user",
                {
                    firstName: firstNameRef.current?.value,
                    lastName: lastNameRef.current?.value,
                    email: emailRef.current?.value,
                    address: addressRef.current?.value,
                    phone: phoneRef.current?.value
                },
                { headers: { 'user-id': user.id } }
            );
            userDispatch({
                type: 'UPDATE',
                data: {
                    firstName: firstNameRef.current?.value,
                    lastName: lastNameRef.current?.value,
                    email: emailRef.current?.value,
                    address: addressRef.current?.value,
                    phone: phoneRef.current?.value,
                    password: passwordRef.current?.value
                }
            })
            setModal(false)
        } catch (e: any) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    switch (e.response.status) {
                        case 400:
                            alert('בקשה לא תקינה, יש לבדוק את המידע שהוזן.');
                            break;
                        case 401:
                            alert('אין גישה, יש להתחבר מחדש.');
                            break;
                        case 403:
                            alert('גישה נדחתה, אין הרשאות לעדכן את המשתמש.');
                            break;
                        case 404:
                            alert('משתמש לא נמצא.');
                            break;
                        default:
                            alert('שגיאה לא ידועה, אנא נסה שוב.');
                            break;
                    }
                } else if (e.request) {
                    alert('לא הצלחנו להתחבר לשרת, אנא בדוק את החיבור לאינטרנט.');
                } else {
                    alert('שגיאה בהגדרת הבקשה: ' + e.message);
                }
            }
        }
    }
    return (
        <>
            <Grid2 container spacing={2}>
                <Grid item>
                    <Avatar sx={{ bgcolor: '#c96b38' }}>
                        {user.firstName?.charAt(0).toUpperCase() + '' + user.lastName?.charAt(0).toUpperCase()}
                    </Avatar>
                </Grid>
                <Grid item>
                    <Button sx={{ bgcolor: '#FFC107' }} variant="contained" onClick={() => setModal(true)} >update </Button>
                </Grid>
            </Grid2>
            <Modal open={modal} >
                <Box sx={style} >
                    <form onSubmit={handleSubmit}>
                        <TextField label='Email' defaultValue={user.email ?? ""} variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} />
                        <TextField label='FirstName' variant="filled" defaultValue={user.firstName ?? ""} margin="normal" fullWidth inputRef={firstNameRef} />
                        <TextField label='LastName' variant="filled" defaultValue={user.lastName ?? ""} margin="normal" fullWidth inputRef={lastNameRef} />
                        <TextField label='Phone' variant="filled" defaultValue={user.phone ?? ""} margin="normal" fullWidth inputRef={phoneRef} />
                        <TextField label='Address' variant="filled" defaultValue={user.address ?? ""} margin="normal" fullWidth inputRef={addressRef} />
                        <Button sx={{ marginTop: '2px', bgcolor: "#FFC107" }} fullWidth variant="contained" type="submit">save</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
export default UpdateUser;