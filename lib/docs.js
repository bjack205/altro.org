import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import makeDocPages from '../content/doc-config.js';

const docsDirectory = path.join(process.cwd(), 'content/docs');

export function fetchDocContent() {
  const pages = makeDocPages();

  const results = pages.map((page, i) => {
    if (!page.children) {
      const fullPath = path.join(docsDirectory, page.path);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      const matterData = matterResult.data;
      matterData.fullPath = fullPath;
      const slug = page.path.replace(/\.mdx$/, '');
      matterData.index = i;

      if (matterData.slug !== slug) {
        throw new Error('slug field not match with the path of its content source');
      }
      return matterData;
    } else if (page.children) {
      const results = page.children.map((child) => {
        const fullPath = path.join(docsDirectory, child.path);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents, {
          engines: {
            yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
          },
        });
        const matterData = matterResult.data;
        matterData.fullPath = fullPath;
        const slug = child.path.replace(/\.mdx$/, '');

        if (matterData.slug !== slug) {
          throw new Error('slug field not match with the path of its content source');
        }
        return matterData;
      });
      return {
        title: page.label,
        children: results,
      };
    }
  });

  return results;
}

export function fetchDocBySlug(docSlug) {
  const doc = fetchDocContent().filter((doc) => doc.slug === docSlug);
  const fullPath = path.join(docsDirectory, docSlug + '.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { content, data } = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  return { content: content, data: data, doc: doc };
}
