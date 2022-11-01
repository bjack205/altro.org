let fs = require('fs');
let path = require('path');
let yaml = require('js-yaml');
let matter = require('gray-matter');
let documentation = require('../content/doc-config.json');

const docsDirectory = path.join(process.cwd(), 'content/docs');

function getDocs() {
  const pages = documentation;

  const results = pages.map((page) => {
    if (!page.children) {
      const fullPath = path.join(docsDirectory, page.path);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      matterResult.fullPath = fullPath;
      matterResult.title = page.label;
      matterResult.slug = page.path.replace(/\.mdx$/, '');
      return matterResult;
    } else if (page.children) {
      const results = page.children.map((child) => {
        const fullPath = path.join(docsDirectory, child.path);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents, {
          engines: {
            yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
          },
        });
        matterResult.fullPath = fullPath;
        matterResult.title = child.label;
        matterResult.slug = child.path.replace(/\.mdx$/, '');
        return matterResult;
      });
      return {
        title: page.label,
        children: results,
      };
    }
  });

  return JSON.stringify(results);
}

const fileContents = `export const docs = ${getDocs()}`;

try {
  fs.readdirSync('cache');
} catch {
  fs.mkdirSync('cache');
}

fs.writeFile('cache/data.js', fileContents, function (err) {
  if (err) return console.log(err);
  console.log('Docs Cached');
});
