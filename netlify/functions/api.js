// Netlify Function entry point. Netlify's [[redirects]] rule in netlify.toml
// sends every /api/* request here. Netlify strips the "/.netlify/functions/api"
// prefix before invoking us, so by the time Express sees the request, a call
// to /api/progress arrives as /progress — that's why createApp() is built
// with an empty prefix here (see server/app.js).
require("dotenv").config();

const serverless = require("serverless-http");
const createApp  = require("../../app");

const app = createApp({ prefix: "" });

exports.handler = serverless(app, {
  // Treat file-upload bodies (resume/video) as binary so multer receives
  // an actual Buffer instead of a mangled UTF-8 string.
  binary: ["multipart/form-data"],
});
