
import { Box, Typography } from '@mui/material';

export default () => {
    return (
        <Box
            sx={{
                textAlign: 'center', 
                fontSize: '36px', 
                fontWeight: 'bold', 
                lineHeight: 1.5, 
                paddingTop: '100px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'flex-end', 
                flexDirection: 'column', 
              
            }}
        >
            <Typography variant="h2" sx={{ fontSize: '48px', fontWeight: 'bold', color: '#e74c3c',marginRight: '20%', }}>
                ברוכים הבאים לאתר המתכונים
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '24px', color: '#f39c12',marginRight: '23%', }}>
                .המקום המוביל למתכונים טעימים והשראה לבישול
                <br /> מטרתנו היא לשתף אתכם בתענוג הבישול
                <br /> .ולעזור לכם ליצור ארוחות זכורות לעצמכם ולאהוביכם
                <br />
                !בואו דפדפו באוסף המתכונים שלנו, ותתחילו לבשל
            </Typography>
        </Box>
    );
}