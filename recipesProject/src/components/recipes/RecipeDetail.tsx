import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/recipesStor";
import { Button, Container, Grid2, List, ListItem, Paper, Typography } from "@mui/material";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recipe = useSelector((state: RootState) =>
    state.recipes.recipes.find(recipe => recipe.id === Number(id))
  );

  if (!recipe) {
    return <div>מתכון לא נמצא</div>;
  }

  return (

    <Container
      component={Paper}
      elevation={5}
      style={{
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "#f2f2f2",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
      dir="rtl"
    >
      <section style={{ marginBottom: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          <span style={{ fontSize: "24px", fontWeight: "bold", color: "#008000" }}>
            {recipe.title}
          </span>
        </Typography>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "#6495ED" }}>
            &#x1F372; תיאור:
          </span>
        </Typography>
        <Typography variant="body1" paragraph>
          {recipe.description}
        </Typography>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "#FFA07A" }}>
            &#x1F373; מרכיבים:
          </span>
        </Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>{ingredient.value}</ListItem>
          ))}
        </List>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "#DC143C" }}>
            &#x1F374; הוראות:
          </span>
        </Typography>
        <Typography variant="body1">
          {recipe.instructions}
        </Typography>
      </section>

    </Container>

  );
}
export default RecipeDetail;