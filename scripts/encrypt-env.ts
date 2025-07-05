import { execSync } from "node:child_process";
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const DOTENVX = "npx dotenvx encrypt";
const KEY_FILE = ".env.keys";

if (!existsSync(KEY_FILE)) {
  throw new Error("ERROR: env.keys file not found! Aborting.");
}

const envFilesToEncryot = readdirSync(process.cwd())
  .filter(
    (f) =>
      f.startsWith(".env") &&
      !f.endsWith(".encrypted") &&
      f !== KEY_FILE &&
      statSync(path.join(process.cwd(), f)).isFile()
  );

for (const file of envFilesToEncryot) {
  const encrypted = `${file}.encrypted`;

  copyFileSync(file, encrypted);
  execSync(`${DOTENVX} --env-file "${encrypted}" --env-keys-file "${KEY_FILE}"`);

  console.log(`Encrypted ${file} -> ${encrypted}`);
}