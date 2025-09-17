import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import { db } from "./util/FirebaseInit.js";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN
	})
)
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.get("/projects", async (req, res) => {
    try {
        const ref = collection(db, "projects");
        const snap = await getDocs(ref);
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        res.status(200).json(items);
    } catch (err) {
        console.error("GET /projects error:", err);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

app.post("/projects", async (req, res) => {
    try {
        const { name, date, course, description } = req.body || {};
        if (!name || !date || !course || !description ) {
            return res.status(400).json({ error: "name, date, course, and description are required" });
        }
        const ref = collection(db, "projects");
        const docRef = await addDoc(ref, {
            name: String(name).slice(0, 100),
            date: String(date).slice(0, 100),
            course: String(course).slice(0, 100),
            description: String(description).slice(0, 500),
        });
        res.status(201).json({ id: docRef.id, ok: true });
    } catch (e) {
        console.error("POST /projects error:", e);
        res.status(500).json({ error: "Failed to create entry" });
    }
});

app.delete("/projects/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, "projects", id));
        res.status(204).end();
    } catch (err) {
        console.error("DELETE /projects/:id error:", err);
        res.status(500).json({ error: "Failed to delete entry" });
    }
});

function start() {
	app.listen(port, () => {
		console.log(`Started listening on http://localhost:${port}`)
	})
}

start()
