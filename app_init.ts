import { spawn } from "child_process";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import { app } from "electron";

export async function createRootFolders() {
  new Promise<void>((resolve, reject) => {
    const appDataPath = process.env.APPDATA;
    if (!appDataPath) {
      return reject(new Error("APPDATA environment variable is not set"));
    }

    const rootFolder = path.join(appDataPath, app.name || "uniplanner");
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder);
    }

    const notesJsonFile = path.join(rootFolder, "notes.json");
    if (!fs.existsSync(notesJsonFile)) {
      fs.writeFileSync(notesJsonFile, JSON.stringify({}));
    }
    

    resolve();
  });
}

export async function checkOllamaInstalled(): Promise<boolean> {
  async function helper(): Promise<boolean> {
    return new Promise((resolve) => {
      const p = spawn("ollama", ["--version"]);

      p.on("error", () => resolve(false));
      p.on("close", (code) => resolve(code === 0));
    });
  }
  return await helper();
}

export async function downloadOllama() : Promise<void> {
  const appDataPath = process.env.APPDATA;
  const out = path.join(appDataPath, app.name || "uniplanner", "OllamaSetup.exe");

  const totalSize = await getTotalSize("https://ollama.com/download/OllamaSetup.exe");

  if(fs.existsSync(out)) {
    const stats = fs.statSync(out);
    const fileSizeInBytes = stats.size;
    if(fileSizeInBytes === totalSize) {
      console.log("Ollama installer already downloaded.");
      return Promise.resolve();
    }
  };

  return new Promise((resolve, reject) => {
    function request(url) {
      https
        .get(url, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            return request(res.headers.location);
          }

          if (res.statusCode !== 200) {
            return reject(new Error("Download failed: " + res.statusCode));
          }

          const total = Number(res.headers["content-length"]);
          console.log(total)
          let downloaded = 0;

          if (!total) {
            console.log(
              "Content-Length empty, percentage cannot be calculated",
            );
          }

          const file = fs.createWriteStream(out);

          res.on("data", (chunk) => {
            downloaded += chunk.length;

            if (total) {
              const percent = ((downloaded / total) * 100).toFixed(2);
              const mb = (downloaded / 1024 / 1024).toFixed(1);
              const totalMb = (total / 1024 / 1024).toFixed(1);

              process.stdout.write(
                `\r Downloading Ollama: ${percent}% (${mb}/${totalMb} MB)`,
              );
            }
          });

          res.pipe(file);

          file.on("finish", () => {
            process.stdout.write("\nDownload complete\n");
            file.close(() => resolve());
          });

          file.on("error", reject);
        })
        .on("error", reject);
    }

    request("https://ollama.com/download/OllamaSetup.exe");
  });
}

export function setupOllama() {
  return new Promise((resolve, reject) => {
      const appDataPath = process.env.APPDATA;
      const out = path.join(appDataPath, app.name || "uniplanner", "OllamaSetup.exe");
      const installerPath = path.join(appDataPath, app.name || "uniplanner", "OllamaSetup.exe");

    const p = spawn(installerPath, ["/S"], { stdio: "ignore" });

    p.on("error", reject);
    p.on("close", (code) => {
      if (code === 0) resolve(true);
      else reject(new Error("Installer exited with code " + code));
    });
  });
}

export function getTotalSize(url) : Promise<number> {
  return new Promise((resolve, reject) => {
    function request(url) {
      https
        .get(url, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            return request(res.headers.location);
          }

          if (res.statusCode !== 200) {
            return reject(new Error("Request failed: " + res.statusCode));
          }

          const total = Number(res.headers["content-length"]);

          if (!total) {
            console.log(
              "Content-Length empty, size cannot be determined",
            );
          }

          resolve(total);
     
        })
        .on("error", reject);
    }

    request(url);
  });
}
