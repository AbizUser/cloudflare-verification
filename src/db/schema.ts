import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey().notNull(),
  title: varchar('title').notNull(),
  description: text('description'),
  dueDate: timestamp('due_date').notNull(),
  status: varchar('status', { length: 255 }).notNull().default('未完了'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull(),
});