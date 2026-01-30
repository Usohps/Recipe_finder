import express from "express";
import { ENV } from "./config/env.js";
import { neon } from "@neondatabase/serverless";
import job from "./config/cron.js";

const sql = neon(ENV.DATABASE_URL);
const app = express();
const PORT = ENV.PORT;
if (ENV.NODE_ENV === "production") job.start();

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy" });
});
app.use(express.json());

app.post("/api/favorites", async (req, res) => {
  try {
    const { recipeId, userId, title, image, cookTime, servings } = req.body;
    if (!recipeId || !userId || !title) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const recipeIdNum = parseInt(recipeId);
    const userIdNum = parseInt(userId);
    const servingsNum = servings ? parseInt(servings) : null;

    const result = await sql`
      INSERT INTO favorites (recipe_id, user_id, title, image, cook_time, servings)
      VALUES (${recipeIdNum}, ${userIdNum}, ${title}, ${image}, ${cookTime}, ${servingsNum})
      RETURNING *
    `;

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ success: false, message: "Failed to add favorite" });
  }
});
//DELETE FAVORITE ENDPOINT
app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await sql`
      DELETE FROM favorites
      WHERE user_id = ${userId} AND recipe_id = ${parseInt(recipeId)}
    `;
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.log("Error removing a favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
// GET FAVORITES ENDPOINT
app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await sql`
      SELECT * FROM favorites
      WHERE user_id = ${userId}
    `;

    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch favorites" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
