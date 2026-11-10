import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcAdmin = path.join(rootDir, "admin");
const destAdmin = path.join(rootDir, ".output", "public", "admin");

const staticFiles = [".htaccess", "robots.txt", "sitemap.xml"];

try {
  if (fs.existsSync(srcAdmin)) {
    fs.cpSync(srcAdmin, destAdmin, { recursive: true });
    console.log("[build] Successfully copied admin/ to .output/public/admin/");
  }

  const publicDir = path.join(rootDir, "public");
  const outputPublicDir = path.join(rootDir, ".output", "public");

  for (const file of staticFiles) {
    const src = path.join(publicDir, file);
    const dest = path.join(outputPublicDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`[build] Successfully copied public/${file} to .output/public/${file}`);
    }
  }
} catch (err) {
  console.error("[build] Error copying build assets:", err);
}
