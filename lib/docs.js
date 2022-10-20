import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
let documentation = require('../content/doc-config.json');

const docsDirectory = path.join(process.cwd(), 'content/docs');

export function fetchDocContent() {
  const pages = documentation;

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
  const docs = fetchDocContent();

  let nextSlug = {
    title: '',
    slug: '',
  };

  let previousSlug = {
    title: '',
    slug: '',
  };

  let doc = '';

  for (let i = 0; i < docs.length; i++) {
    if (docs[i].children) {
      for (let j = 0; j < docs[i].children.length; j++) {
        if (docs[i].children[j].slug == docSlug) {
          doc = docs[i].children[j];
          if (j > 0) {
            previousSlug.title = docs[i].children[j - 1].title;
            previousSlug.slug = docs[i].children[j - 1].slug;
          } else {
            if (i > 0) {
              if (docs[i - 1].children) {
                previousSlug.title = docs[i - 1].children[docs[i - 1].children.length - 1].title;
                previousSlug.slug = docs[i - 1].children[docs[i - 1].children.length - 1].slug;
              } else {
                previousSlug.title = docs[i - 1].title;
                previousSlug.slug = docs[i - 1].slug;
              }
            } else {
              previousSlug.title = docs[i].children[j].title;
              previousSlug.slug = docs[i].children[j].slug;
            }
          }
          if (j < docs[i].children.length - 1) {
            nextSlug.title = docs[i].children[j + 1].title;
            nextSlug.slug = docs[i].children[j + 1].slug;
          } else {
            if (i < docs.length - 1) {
              if (docs[i + 1].children) {
                nextSlug.title = docs[i + 1].children[0].title;
                nextSlug.slug = docs[i + 1].children[0].slug;
              } else {
                nextSlug.title = docs[i + 1].title;
                nextSlug.slug = docs[i + 1].slug;
              }
            } else {
              nextSlug.title = docs[i].children[j].title;
              nextSlug.slug = docs[i].children[j].slug;
            }
          }
          break;
        }
      }
      if (nextSlug.slug) {
        break;
      }
    } else {
      if (docs[i].slug == docSlug) {
        doc = docs[i];
        if (i > 0) {
          if (docs[i - 1].children) {
            previousSlug.title = docs[i - 1].children[docs[i - 1].children.length - 1].title;
            previousSlug.slug = docs[i - 1].children[docs[i - 1].children.length - 1].slug;
          } else {
            previousSlug.title = docs[i - 1].title;
            previousSlug.slug = docs[i - 1].slug;
          }
        } else {
          previousSlug.title = docs[i].title;
          previousSlug.slug = docs[i].slug;
        }
        if (i < docs.length - 1) {
          if (docs[i + 1].children) {
            nextSlug.title = docs[i + 1].children[0].title;
            nextSlug.slug = docs[i + 1].children[0].slug;
          } else {
            nextSlug.title = docs[i + 1].title;
            nextSlug.slug = docs[i + 1].slug;
          }
        } else {
          nextSlug.title = docs[i].title;
          nextSlug.slug = docs[i].slug;
        }
        break;
      }
    }
  }

  const fullPath = path.join(docsDirectory, docSlug + '.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { content, data } = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  return {
    content: content,
    data: data,
    doc: doc,
    docs: docs,
    nextDoc: nextSlug,
    previousDoc: previousSlug,
  };
}
