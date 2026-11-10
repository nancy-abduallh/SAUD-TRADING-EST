import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const srcAdmin = path.join(rootDir, "admin");
const destAdmin = path.join(rootDir, ".output", "public", "admin");
const srcHtaccess = path.join(rootDir, "public", ".htaccess");
const destHtaccess = path.join(rootDir, ".output", "public", ".htaccess");

try {
  if (fs.existsSync(srcAdmin)) {
    fs.cpSync(srcAdmin, destAdmin, { recursive: true });
    console.log("[build] Successfully copied admin/ to .output/public/admin/");
  }
  if (fs.existsSync(srcHtaccess)) {
    fs.copyFileSync(srcHtaccess, destHtaccess);
    console.log("[build] Successfully copied public/.htaccess to .output/public/.htaccess");
  }
} catch (err) {
  console.error("[build] Error copying build assets:", err);
}
