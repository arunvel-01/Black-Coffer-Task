import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";
import { job } from './cron.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

app.get("/", (req, res) => {
    res.json("Hello from the server");
});

app.get("/data", async (req, res) => {
    try {
        const collections = await db.db.listCollections().toArray();
        if (collections.length === 0) {
            return res.json({ message: "No collections found in the database." });
        }

        const data = [];
        for (let collection of collections) {
            const collectionName = collection.name;
            const collectionData = await db.db.collection(collectionName).find({}).toArray();
            data.push(...collectionData);  // Combine all collection data into a single array
        }

        res.json(data);  // Send a single array of data objects
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

job.start();

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server is running on port ${port}.`);
});
