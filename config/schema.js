import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import RoomType from "@/app/dashboard/create-new/_Components/RoomType";
export const Users = pgTable('users', {
    id: serial('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    imageUrl: varchar('imageUrl', { length: 500 }).notNull(),
    credits: integer('credits').default(3),
});

export const AiGenratedImage = pgTable('aiGenratedImage', {
    id: serial('id').primaryKey(),
    roomType: varchar('roomType', { length: 100 }).notNull(),
    designType: varchar('designType', { length: 100 }).notNull(),
    orgImage: varchar('orgImage', { length: 500 }).notNull(),
    aiImage: varchar('aiImage', { length: 500 }).notNull(),
    userEmail: varchar('userEmail', { length: 255 }),
});