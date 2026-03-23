#!/usr/bin/env node

/**
 * CNZR CLI - Build Tool
 * Command: cnzr build [options]
 */

import { mkdir, copyFile, readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function buildProject(options = {}) {
  const {
    output = 'dist',
    esm = true,
    cjs = false
  } = options;

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎮 CNZR Build Tool                                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Building project...
Output: ${output}
ESM: ${esm ? 'Yes' : 'No'}
CJS: ${cjs ? 'Yes' : 'No'}
`);

  try {
    const outputPath = join(process.cwd(), output);

    // Create output directory
    await mkdir(outputPath, { recursive: true });
    console.log('✅ Created output directory');

    // Copy server files
    await copyDirectory('routes', join(outputPath, 'routes'));
    console.log('✅ Copied routes');

    await copyDirectory('views', join(outputPath, 'views'));
    console.log('✅ Copied views');

    await copyDirectory('public', join(outputPath, 'public'));
    console.log('✅ Copied public assets');

    // Copy server.js
    await copyFile('server.js', join(outputPath, 'server.js'));
    console.log('✅ Copied server file');

    // Copy package.json
    await copyFile('package.json', join(outputPath, 'package.json'));
    console.log('✅ Copied package.json');

    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ✨ Build completed successfully!                          ║
║                                                              ║
║   Output: ${output}/                                        ║
║                                                              ║
║   Next steps:                                               ║
║   1. cd ${output}                                           ║
║   2. npm install --production                               ║
║   3. node server.js                                         ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);

  } catch (error) {
    console.error('❌ Build error:', error.message);
    process.exit(1);
  }
}

async function copyDirectory(src, dest) {
  try {
    await mkdir(dest, { recursive: true });
    
    const entries = await readdir(src);
    
    for (const entry of entries) {
      const srcPath = join(src, entry);
      const destPath = join(dest, entry);
      
      const stats = await stat(srcPath);
      
      if (stats.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    // Directory might not exist, skip
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  const options = {
    output: args.includes('--output')
      ? args[args.indexOf('--output') + 1]
      : 'dist',
    esm: args.includes('--esm'),
    cjs: args.includes('--cjs')
  };

  buildProject(options);
}
