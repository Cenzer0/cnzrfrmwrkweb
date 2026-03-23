#!/usr/bin/env node

/**
 * CNZR CLI - Development Server
 * Command: cnzr dev [options]
 */

import { spawn } from 'child_process';
import { watch } from 'fs';
import { join } from 'path';

export async function startDevServer(options = {}) {
  const {
    port = 3000,
    host = 'localhost',
    fullstack = false,
    fileRouting = false
  } = options;

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎮 CNZR Development Server                                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Starting development server...
Port: ${port}
Host: ${host}
Fullstack mode: ${fullstack ? 'Enabled' : 'Disabled'}
File routing: ${fileRouting ? 'Enabled' : 'Disabled'}
`);

  // Set environment variables
  process.env.PORT = port;
  process.env.HOST = host;
  process.env.NODE_ENV = 'development';
  
  if (fullstack) {
    process.env.FULLSTACK = 'true';
  }
  
  if (fileRouting) {
    process.env.FILE_ROUTING = 'true';
  }

  let serverProcess = null;

  function startServer() {
    if (serverProcess) {
      serverProcess.kill();
    }

    console.log('🔄 Starting server...');

    serverProcess = spawn('node', ['server.js'], {
      stdio: 'inherit',
      env: process.env
    });

    serverProcess.on('error', (error) => {
      console.error('❌ Server error:', error);
    });

    serverProcess.on('exit', (code) => {
      if (code !== null && code !== 0) {
        console.error(`❌ Server exited with code ${code}`);
      }
    });
  }

  // Start initial server
  startServer();

  // Watch for file changes
  const watchPaths = ['server.js', 'routes', 'views'];
  
  console.log('👀 Watching for changes...\n');

  watchPaths.forEach(path => {
    const fullPath = join(process.cwd(), path);
    
    try {
      watch(fullPath, { recursive: true }, (eventType, filename) => {
        if (filename) {
          console.log(`\n📝 File changed: ${filename}`);
          console.log('🔄 Restarting server...\n');
          startServer();
        }
      });
    } catch (error) {
      // Path might not exist, skip
    }
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down development server...');
    if (serverProcess) {
      serverProcess.kill();
    }
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    if (serverProcess) {
      serverProcess.kill();
    }
    process.exit(0);
  });
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  const options = {
    port: args.includes('--port') 
      ? parseInt(args[args.indexOf('--port') + 1])
      : 3000,
    host: args.includes('--host')
      ? args[args.indexOf('--host') + 1]
      : 'localhost',
    fullstack: args.includes('--fullstack'),
    fileRouting: args.includes('--file-routing')
  };

  startDevServer(options);
}
