import path from "path";
import { Link } from "../shared/models/Link";
import { app } from "electron";
import { ApiResponse } from "../shared/models/ApiResponse";

export async function saveLinks(links: Link[]) {
  const appDataPath = process.env.APPDATA;
  const notesJsonFile = path.join(
    appDataPath,
    app.name || "uniplanner",
    "links.json",
  );
  const data = JSON.stringify(links, null, 2);
  return new Promise((resolve, reject) => {
    try {
      require("fs").writeFileSync(notesJsonFile, data);
      resolve({
        data: undefined,
        message: "Links saved successfully",
        ok: true,
      } as ApiResponse<void>);
    } catch (error) {
      resolve({
        data: undefined,
        message: "Failed to save links",
        ok: false,
      } as ApiResponse<void>);
    }
  });
}

export async function readLinks(): Promise<ApiResponse<Link[]>> {
  const appDataPath = process.env.APPDATA;
  const notesJsonFile = path.join(
    appDataPath,
    app.name || "uniplanner",
    "links.json",
  );

  return new Promise((resolve, reject) => {
    try {
      if (require("fs").existsSync(notesJsonFile)) {
        const data = require("fs").readFileSync(notesJsonFile, "utf-8");
        const links = JSON.parse(data) as Link[];
        resolve({
          data: links,
          message: "Links read successfully",
          ok: true,
        } as ApiResponse<Link[]>);
      } else {
        resolve({
          data: [],
          message: "No links found",
          ok: true,
        } as ApiResponse<Link[]>);
      }
    } catch (error) {
      resolve({
        data: undefined,
        message: "Failed to read links",
        ok: false,
      } as ApiResponse<Link[]>);
    }
  });
}
