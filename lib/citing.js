import fs from 'fs';
import path from 'path';

const citingDirectory = path.join(process.cwd(), 'content/citing');

export function fetchCitingContent() {
  const fullPath = path.join(citingDirectory, 'citing.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return { content: fileContents };
}
