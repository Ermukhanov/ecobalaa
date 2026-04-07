#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('dist directory not found!');
  process.exit(1);
}

// Get all HTML files from root except those in dist
const htmlFiles = fs.readdirSync(rootDir)
  .filter(file => file.endsWith('.html') && !file.startsWith('.'));

// Files to copy alongside HTML files
const supportFiles = ['ai-helper.js', 'supabase2.js', 'eco-reward-boost.js'];

console.log(`Copying ${htmlFiles.length} HTML files to dist...`);

htmlFiles.forEach(file => {
  const src = path.join(rootDir, file);
  const dest = path.join(distDir, file);
  
  try {
    const content = fs.readFileSync(src, 'utf-8');
    fs.writeFileSync(dest, content);
    console.log(`✓ Copied ${file}`);
  } catch (err) {
    console.error(`✗ Failed to copy ${file}: ${err.message}`);
  }
});

// Copy support JS files
console.log(`\nCopying ${supportFiles.length} support files to dist...`);
supportFiles.forEach(file => {
  const src = path.join(rootDir, file);
  const dest = path.join(distDir, file);
  
  if (!fs.existsSync(src)) {
    return; // Skip if file doesn't exist
  }
  
  try {
    const content = fs.readFileSync(src, 'utf-8');
    fs.writeFileSync(dest, content);
    console.log(`✓ Copied ${file}`);
  } catch (err) {
    console.error(`✗ Failed to copy ${file}: ${err.message}`);
  }
});

console.log('✓ All files copied successfully!');

