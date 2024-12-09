// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `bjj-progress-tracker_${name}`,
);

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

// db data for dates w notes and events

export const users = createTable("users", {
  id: text("id", { mode: "text" }).primaryKey().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
}));

export const events = createTable("events", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  authorId: text("author_id", { mode: "text" }).notNull(),
  title: text("title", { length: 256 }).notNull(),
  content: text("content", { length: 256 }).notNull(),
  eventDate: int("event_date", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const eventsRelations = relations(events, ({ one }) => ({
  author: one(users, {
    fields: [events.authorId],
    references: [users.id],
  }),
}));
