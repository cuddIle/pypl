import fs from "fs";
import path from "path";

/**
 * Convert camelCase or PascalCase to kebab-case
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Recursively rename all files and directories to kebab-case
 */
function renameRecursively(dir) {
  // Get all entries (files + directories)
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Directories first (to avoid path issues)
  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      renameRecursively(oldPath);
      const kebab = toKebabCase(entry.name);
      if (kebab !== entry.name) {
        const newPath = path.join(dir, kebab);
        fs.renameSync(oldPath, newPath);
      }
    }
  }

  // Then files
  for (const entry of entries) {
    const oldPath = path.join(dir, entry.name);
    if (!entry.isDirectory()) {
      const kebab = toKebabCase(entry.name);
      if (kebab !== entry.name) {
        const newPath = path.join(dir, kebab);
        fs.renameSync(oldPath, newPath);
      }
    }
  }
}

// Usage: node rename-to-kebab-case.js
const targetDir = process.argv[2] || ".";
renameRecursively(path.resolve(targetDir));
console.log("Renaming complete! Now update your import paths as well.");