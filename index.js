require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const multer  = require("multer");

const applicationsRouter = require("./routes/applications");
const progressRouter     = require("./routes/progress");

const app    = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: ["https://gentle-vacherin-4e94cb.netlify.app/"] }));
app.use(express.json());

// Mount routes
app.use("/api/applications", applicationsRouter);
app.use("/api/progress",     progressRouter);

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
