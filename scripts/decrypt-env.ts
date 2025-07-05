import { execSync } from "node:child_process";
import { existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const DOTENVX = "npx dotenvx decrypt --env-file";
const KEY_FILE = ".env.keys";

if (!existsSync(KEY_FILE)) {
  throw new Error("ERROR: env.keys file not found! Aborting.");
}

const files = readdirSync(process.cwd())
  .filter(
    (f) =>
      f.startsWith(".env") &&
      f.endsWith(".encrypted") &&
      statSync(path.join(process.cwd(), f)).isFile()
  );

for (const encrypted of files) {
  const original = encrypted.replace(/\.encrypted$/, "");
  // Decrypt and overwrite original
  const decrypted = execSync(`${DOTENVX} "${encrypted}" --stdout`, { encoding: "utf8" });
  writeFileSync(original, decrypted);
  console.log(`Decrypted ${encrypted} -> ${original}`);
}