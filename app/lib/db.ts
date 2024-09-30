import { Client } from "@vercel/postgres";

const client = new Client({
  connectionString: process.env.POSTGRES_URL, // Adjust based on your need
});

export default client;
