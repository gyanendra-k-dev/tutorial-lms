import dotenv from 'dotenv';
dotenv.config();

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// Use a server-only DATABASE_URL environment variable for security
const databaseUrl = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING;

export const db = drizzle(neon(databaseUrl));
