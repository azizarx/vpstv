import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import WebTorrent from "webtorrent";
import path from "path";
import fs from "fs";
const client = new WebTorrent();
const value = "magnet:?xt=urn:btih:709c21b28f60d038bc2c206b766f924c4df12808&dn=Mr.+Bond+-+Meme+Harder+720p&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969"
client.add(value, (torrent) => {
    console.log("Torrent downloading...");
    console.log(path);
    torrent.on('error', (err) => {
        console.error('Torrent error:', err);
    });
    
    torrent.on('done', () => {
        console.log('Torrent download finished');
        // Additional handling after download completes
    });
});

console.log(client.torrents)
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// POST route to start torrent download
app.post("/", async (req, res) => {
    const { value } = req.body;
  
  
  res.send("omok");
});


app.get("/video/:id", (req, res) => {
  const { id } = req.params;
  let filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'media', id);
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
      const start = Number.parseInt(parts[0], 10);
      const end = parts[1] ? Number.parseInt(parts[1], 10) : fileSize - 1;
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
