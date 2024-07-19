import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import WebTorrent from "webtorrent";
import path from "path";
import fs from "fs";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const client = new WebTorrent();

// POST route to start torrent download
app.post("/", (req, res) => {
  const { value } = req.body;
  console.log(value);
  
  client.add(value, { path:'./media'}, function (torrent) {
    console.log("Torrent downloading...");
    console.log(path);
    torrent.on('error', function (err) {
      console.error('Torrent error:', err);
    });
  
    torrent.on('done', function () {
      console.log('Torrent download finished');
      // Additional handling after download completes
    });
  });
  
});

/*
app.get("/video/:id", (req, res) => {
  const { id } = req.params;
  var filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'media', id);
  //remove the first letter from the filepath
  filePath = filePath.substring(1);
  console.log(filePath);
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Stream the video file to the client
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.status(404).send("File not found");
  }
});
*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
