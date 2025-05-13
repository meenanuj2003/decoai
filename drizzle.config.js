import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://roomdesign_owner:npg_eOpXQ7ZkAi1l@ep-divine-shape-a46or5km-pooler.us-east-1.aws.neon.tech/roomdesign?sslmode=require',
  },
});
