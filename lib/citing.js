import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const citingDirectory = path.join(process.cwd(), 'content/citing');

export function fetchCitingContent() {
  const fullPath = path.join(citingDirectory, 'citing.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { content, data } = matter(fileContents, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
    },
  });

  return { content: content, data: data };
}
