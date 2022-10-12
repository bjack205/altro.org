import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import yaml from 'js-yaml';

const docsDirectory = path.join(process.cwd(), 'content/docs');

let docCache;

export function fetchDocContent() {
  if (docCache) {
    return docCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(docsDirectory);
  const allDocsData = fileNames
    .filter((it) => {
      if (it.endsWith('.mdx')) {
        return it;
      }
    })
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      const matterData = matterResult.data;
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, '');

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error('slug field not match with the path of its content source');
      }

      return matterData;
    });
  // Sort posts by date
  docCache = allDocsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return docCache;
}

export function countDocs(tag) {
  return fetchDocContent().filter((it) => !tag || (it.tags && it.tags.includes(tag))).length;
}

export function listDocContent() {
  return fetchDocContent();
  // .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
  // .slice((page - 1) * limit, page * limit);
}
