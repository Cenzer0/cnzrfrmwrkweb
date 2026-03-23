#!/usr/bin/env node

/**
 * CNZR CLI - Project Generator
 * Command: cnzr new <project-name> [options]
 */

import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const templates = {
  basic: {
    name: 'Basic',
    description: 'Simple CNZR server with basic routing'
  },
  fullstack: {
    name: 'Fullstack',
    description: 'Full-stack app with SSR and API endpoints'
  }
};

export async function createProject(projectName, options = {}) {
  const {
    template = 'basic',
    typescript = false,
    git = false
  } = options;

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🎮 CNZR Project Generator                                 ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Creating project: ${projectName}
Template: ${template}
TypeScript: ${typescript ? 'Yes' : 'No'}
Git: ${git ? 'Yes' : 'No'}
`);

  const projectPath = join(process.cwd(), projectName);

  try {
    // Create project directory
    await mkdir(projectPath, { recursive: true });
    console.log('✅ Created project directory');

    // Create subdirectories
    await mkdir(join(projectPath, 'public'), { recursive: true });
    await mkdir(join(projectPath, 'views'), { recursive: true });
    await mkdir(join(projectPath, 'routes'), { recursive: true });
    console.log('✅ Created project structure');

    // Generate files based on template
    if (template === 'basic') {
      await generateBasicTemplate(projectPath, typescript);
    } else if (template === 'fullstack') {
      await generateFullstackTemplate(projectPath, typescript);
    }

    // Generate package.json
    await generatePackageJson(projectPath, projectName, typescript);
    console.log('✅ Generated package.json');

    // Initialize git if requested
    if (git) {
      await generateGitignore(projectPath);
      console.log('✅ Created .gitignore');
    }

    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ✨ Project created successfully!                          ║
║                                                              ║
║   Next steps:                                               ║
║   1. cd ${projectName}                                      ║
║   2. npm install                                            ║
║   3. npm run dev                                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);

  } catch (error) {
    console.error('❌ Error creating project:', error.message);
    process.exit(1);
  }
}

async function generateBasicTemplate(projectPath, typescript) {
  const ext = typescript ? 'ts' : 'js';
  
  const serverCode = `import { CenzeroApp } from 'cnzr';

const app = new CenzeroApp();

app.get('/', (ctx) => {
  return ctx.json({ message: 'Hello CNZR!' });
});

app.listen(3000);
console.log('🚀 Server running on http://localhost:3000');
`;

  await writeFile(join(projectPath, `server.${ext}`), serverCode);
  console.log('✅ Generated server file');
}

async function generateFullstackTemplate(projectPath, typescript) {
  const ext = typescript ? 'ts' : 'js';
  
  const serverCode = `import { CenzeroApp, logger, cors } from 'cnzr';

const app = new CenzeroApp({
  staticDir: 'public',
  viewEngine: 'ejs',
  viewsDir: 'views'
});

app.plugin(logger({ level: 'info' }));
app.plugin(cors());

// SSR Route
app.get('/', (ctx) => {
  return ctx.render('index', {
    title: 'CNZR Fullstack App'
  });
});

// API Route
app.get('/api/data', (ctx) => {
  return ctx.json({
    message: 'API endpoint',
    data: []
  });
});

app.listen(3000);
console.log('🚀 Server running on http://localhost:3000');
`;

  const indexView = `<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1><%= title %></h1>
  <div id="app"></div>
  <script>
    fetch('/api/data')
      .then(res => res.json())
      .then(data => console.log(data));
  </script>
</body>
</html>`;

  await writeFile(join(projectPath, `server.${ext}`), serverCode);
  await writeFile(join(projectPath, 'views', 'index.ejs'), indexView);
  console.log('✅ Generated fullstack template');
}

async function generatePackageJson(projectPath, projectName, typescript) {
  const pkg = {
    name: projectName,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'node server.js',
      start: 'NODE_ENV=production node server.js'
    },
    dependencies: {
      cnzr: '^2.5.2'
    }
  };

  if (typescript) {
    pkg.devDependencies = {
      typescript: '^5.0.0',
      '@types/node': '^20.0.0'
    };
    pkg.scripts.dev = 'tsx server.ts';
  }

  await writeFile(
    join(projectPath, 'package.json'),
    JSON.stringify(pkg, null, 2)
  );
}

async function generateGitignore(projectPath) {
  const gitignore = `node_modules/
.env
*.log
dist/
.DS_Store
`;
  await writeFile(join(projectPath, '.gitignore'), gitignore);
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const projectName = args[0];
  
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

  createProject(projectName, options);
}
