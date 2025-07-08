#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

function toPascalCase(str) {
  return str
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function toUpperCase(str) {
  return str.toUpperCase().replace(/[-\s]/g, '_');
}

async function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  for (const [placeholder, value] of Object.entries(replacements)) {
    const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(regex, value);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated: ${filePath}`);
}

async function replaceInDirectory(dirPath, replacements) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️ Directory not found: ${dirPath}`);
    return;
  }

  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);

    if (item.isDirectory()) {
      // Skip node_modules and .git directories
      if (item.name === 'node_modules' || item.name === '.git') {
        continue;
      }
      await replaceInDirectory(itemPath, replacements);
    } else if (item.isFile()) {
      // Process text files
      const ext = path.extname(item.name);
      const textFileExtensions = ['.ts', '.js', '.json', '.md', '.yml', '.yaml', '.txt', '.html'];

      if (textFileExtensions.includes(ext) || item.name.startsWith('.')) {
        await replaceInFile(itemPath, replacements);
      }
    }
  }
}

async function setupTemplate() {
  console.log('🚀 Xala Enterprise Package Template Setup');
  console.log('========================================\n');

  // Collect template variables
  const packageName = await question('📦 Package name (e.g., authentication, business-services): ');
  const packageDisplayName = await question(
    '🏷️ Package display name (e.g., Authentication, Business Services): '
  );
  const packageDescription = await question('📝 Package description (minimum 50 characters): ');
  const githubOrg =
    (await question('🏢 GitHub organization (default: Xala-Technologies): ')) ||
    'Xala-Technologies';

  console.log('\n🔒 NSM Security Classification:');
  console.log('1. ÅPEN');
  console.log('2. BEGRENSET (default)');
  console.log('3. KONFIDENSIELT');
  console.log('4. HEMMELIG');

  const nsmChoice = (await question('Choose NSM classification (1-4, default: 2): ')) || '2';
  const nsmClassifications = {
    1: 'ÅPEN',
    2: 'BEGRENSET',
    3: 'KONFIDENSIELT',
    4: 'HEMMELIG',
  };
  const nsmClassification = nsmClassifications[nsmChoice] || 'BEGRENSET';

  rl.close();

  // Validate inputs
  if (!packageName) {
    console.error('❌ Package name is required');
    process.exit(1);
  }

  if (!packageDescription || packageDescription.length < 50) {
    console.error('❌ Package description must be at least 50 characters');
    process.exit(1);
  }

  // Generate derived values
  const packageNameKebab = toKebabCase(packageName);
  const packageNamePascal = toPascalCase(packageName);
  const packageNameUpper = toUpperCase(packageName);
  const packageDisplayNamePascal = toPascalCase(packageDisplayName);

  console.log('\n📋 Configuration Summary:');
  console.log(`Package Name: ${packageName}`);
  console.log(`Display Name: ${packageDisplayName}`);
  console.log(`Description: ${packageDescription}`);
  console.log(`GitHub Org: ${githubOrg}`);
  console.log(`NSM Classification: ${nsmClassification}`);
  console.log(`Generated Names:`);
  console.log(`  - Kebab Case: ${packageNameKebab}`);
  console.log(`  - Pascal Case: ${packageNamePascal}`);
  console.log(`  - Upper Case: ${packageNameUpper}`);

  // Define replacements
  const replacements = {
    '{{PACKAGE_NAME}}': packageNameKebab,
    '{{PACKAGE_DISPLAY_NAME}}': packageDisplayNamePascal,
    '{{PACKAGE_DESCRIPTION}}': packageDescription,
    '{{GITHUB_ORG}}': githubOrg,
    '{{NSM_CLASSIFICATION}}': nsmClassification,
  };

  console.log('\n🔄 Processing template files...');

  // Copy template files from template/ directory to current directory
  const templateDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
  const targetDir = process.cwd();

  // Process all files in the template
  await replaceInDirectory(templateDir, replacements);

  // Move files from template directory to root if they're in template/
  const templateFiles = ['package.json', 'README.md', 'src/index.ts'];

  for (const file of templateFiles) {
    const sourcePath = path.join(templateDir, file);
    const targetPath = path.join(targetDir, file);

    if (fs.existsSync(sourcePath)) {
      // Ensure target directory exists
      const targetDirPath = path.dirname(targetPath);
      if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath, { recursive: true });
      }

      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`📁 Copied: ${file}`);
    }
  }

  console.log('\n✅ Template setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Run `pnpm install` to install dependencies');
  console.log('2. Run `pnpm run typecheck` to verify TypeScript configuration');
  console.log('3. Run `pnpm run lint` to check code quality');
  console.log('4. Run `pnpm run compliance:quick` to validate Norwegian compliance');
  console.log('5. Implement package-specific functionality in src/');
  console.log('6. Update docs/README.md with package-specific documentation');
  console.log('7. Run `pnpm test` to ensure all tests pass');
  console.log(
    '\n🇳🇴 Remember to implement Norwegian compliance features specific to your package domain!'
  );
}

// Check if this file is being run directly (not imported)
if (process.argv[1] === new URL(import.meta.url).pathname) {
  setupTemplate().catch(error => {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  });
}

export { setupTemplate };
