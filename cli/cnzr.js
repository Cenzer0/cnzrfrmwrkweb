#!/usr/bin/env node

/**
 * CNZR CLI - Main Entry Point
 * Complete CLI tool for CNZR Framework
 */

import { createProject } from './cnzr-new.js';
import { generateRoute } from './cnzr-generate.js';
import { startDevServer } from './cnzr-dev.js';
import { buildProject } from './cnzr-build.js';

const commands = {
  new: 'Create a new CNZR project',
  generate: 'Generate route handlers',
  dev: 'Start development server',
  build: 'Build project for production',
  help: 'Show help information'
};

function showHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎮 CNZR Framework CLI                                     ║
║   Version 2.5.2                                             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Usage: cnzr <command> [options]

Commands:

  new <project-name> [options]
    Create a new CNZR project
    
    Options:
      --template <type>    Project template (basic|fullstack)
      --typescript         Use TypeScript
      --git                Initialize git repository
    
    Example:
      cnzr new my-app --template fullstack --typescript

  generate <route-name> [options]
    Generate route handlers
    
    Options:
      --template <type>    Route template (basic|api|crud|fullstack|error)
      --status <code>      HTTP status code (for error template)
    
    Example:
      cnzr generate users --template crud

  dev [options]
    Start development server with hot reload
    
    Options:
      --port <port>        Server port (default: 3000)
      --host <host>        Server host (default: localhost)
      --fullstack          Enable fullstack mode
      --file-routing       Enable file-based routing
    
    Example:
      cnzr dev --port 8080 --file-routing

  build [options]
    Build project for production
    
    Options:
      --output <dir>       Output directory (default: dist)
      --esm                Build as ESM modules
      --cjs                Build as CommonJS
    
    Example:
      cnzr build --output build --esm

  help
    Show this help message

For more information, visit: https://github.com/CenZero/cnzr
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  switch (command) {
    case 'new': {
      const projectName = args[1];
      if (!projectName) {
        console.error('❌ Project name is required');
        console.log('Usage: cnzr new <project-name> [options]');
        process.exit(1);
      }

      const options = {
        template: args.includes('--template') 
          ? args[args.indexOf('--template') + 1] 
          : 'basic',
        typescript: args.includes('--typescript'),
        git: args.includes('--git')
      };

      await createProject(projectName, options);
      break;
    }

    case 'generate':
    case 'g': {
      const routeName = args[1];
      if (!routeName) {
        console.error('❌ Route name is required');
        console.log('Usage: cnzr generate <route-name> [options]');
        process.exit(1);
      }

      const options = {
        template: args.includes('--template') 
          ? args[args.indexOf('--template') + 1] 
          : 'basic',
        status: args.includes('--status')
          ? parseInt(args[args.indexOf('--status') + 1])
          : 404
      };

      await generateRoute(routeName, options);
      break;
    }

    case 'dev': {
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

      await startDevServer(options);
      break;
    }

    case 'build': {
      const options = {
        output: args.includes('--output')
          ? args[args.indexOf('--output') + 1]
          : 'dist',
        esm: args.includes('--esm'),
        cjs: args.includes('--cjs')
      };

      await buildProject(options);
      break;
    }

    default:
      console.error(`❌ Unknown command: ${command}`);
      console.log('Run "cnzr help" for usage information');
      process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
