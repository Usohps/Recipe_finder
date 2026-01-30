import { timestamp, serial, text, integer, pgTable } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable("favorites", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").notNull(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  cookTime: text("cook_time"),
  servings: integer("servings"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export const usersTable = pgTable('users',{
//     id: serial('id').primaryKey(),
//     username: text('username').notNull().unique(),
//     email: text('email').notNull().unique(),
//     passwordHash: text('password_hash').notNull(),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
// })

// export const recipesTable = pgTable('recipes',{
//     id: serial('id').primaryKey(),
//     title: text('title').notNull(),
//     ingredients: text('ingredients').notNull(),
//     instructions: text('instructions').notNull(),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
// })

// export const reviewsTable = pgTable('reviews',{
//     id: serial('id').primaryKey(),
//     recipeId: integer('recipe_id').notNull(),
//     userId: integer('user_id').notNull(),
//     rating: integer('rating').notNull(),
//     comment: text('comment'),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
// })

// export const tagsTable = pgTable('tags',{
//     id: serial('id').primaryKey(),
//     name: text('name').notNull().unique(),
// })

// export const recipeTagsTable = pgTable('recipe_tags',{
//     id: serial('id').primaryKey(),
//     recipeId: integer('recipe_id').notNull(),
//     tagId: integer('tag_id').notNull(),
// })
