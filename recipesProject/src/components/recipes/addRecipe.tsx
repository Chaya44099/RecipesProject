import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Container, Typography, Box, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addRecipe } from './recipeSlice';
import { RecipeType } from '../../models/allModels';
import { AppDispatch } from '../../store/recipesStor';
import { UserContext } from '../user/UserReducer';
const schema = yup.object().shape({
    title: yup.string().required('כותרת היא שדה חובה').min(5, 'הכותרת חייבת להיות לפחות 5 תווים'),
    description: yup.string().required('תיאור הוא שדה חובה'),
    ingredients: yup.array().of(
        yup.object().shape({ value: yup.string() })
    ).min(0, 'יש להוסיף לפחות מוצר אחד'),
    instructions: yup.string().required('הוראות הן שדה חובה'),
});

const RecipeForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [currentUser] = useContext(UserContext);
    const { register, control, handleSubmit, formState: { errors } } = useForm<RecipeType>({
        resolver: yupResolver(schema),
        defaultValues: { ingredients: [{ value: '' }] },
    });
    const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const onSubmit = async (data: RecipeType) => {
        const resultAction = await dispatch(addRecipe({ ...data, authorId: currentUser.id }));
        setSnackbarMessage(
            addRecipe.fulfilled.match(resultAction)
                ? 'המתכון נוסף בהצלחה!'
                : typeof resultAction.payload === 'string'
                    ? resultAction.payload
                    : JSON.stringify(resultAction.payload) || 'שגיאה בהוספת המתכון'
        );
        setSnackbarOpen(true);
        if (addRecipe.fulfilled.match(resultAction)) {
            setTimeout(() => {
                navigate('/allrecipes');
            },1500);
           
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container sx={{ 
            padding: '20px',
             borderRadius: '8px',
             boxShadow: 3,
            marginTop:'5%' }}>
            <Typography variant="h4" gutterBottom> הוסף מתכון חדש </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField {...register('title')} label="כותרת" fullWidth
                    margin="normal" error={!!errors.title} helperText={errors.title?.message} />
                <TextField {...register('description')} label="תיאור"
                    fullWidth margin="normal" error={!!errors.description}
                    helperText={errors.description?.message} 
                    />
                <Typography variant="h6" gutterBottom>מרכיבים </Typography>
                {fields.map((item, index) => (
                    <Box key={item.id} display="flex" alignItems="center" marginBottom={2}>
                        <TextField {...register(`ingredients.${index}.value`)} label={`מרכיב ${index + 1}`} fullWidth
                            error={!!errors.ingredients?.[index]?.value} helperText={errors.ingredients?.[index]?.value?.message} />
                        <Button onClick={() => remove(index)} variant="contained" color="secondary" sx={{ marginLeft: '10px' }}> הסר</Button>
                    </Box>
                ))}
                <Button onClick={() => append({ value: '' })}
                    variant="contained" color="primary" sx={{ marginBottom: '20px' }}> הוסף מרכיב</Button>
                <TextField {...register('instructions')} label="הוראות" fullWidth margin="normal" error={!!errors.instructions}
                    helperText={errors.instructions?.message} multiline rows={4} />
                <Button type="submit" variant="contained" color="primary"> שלח מתכון </Button>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
        </Container>
   
    );
};
export default RecipeForm;
