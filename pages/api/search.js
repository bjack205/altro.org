import { docs } from '../../cache/data';

export default function handler(req, res) {
  const results = [];
  if (req.query.q) {
    docs.forEach((doc) => {
      if (doc.children) {
        let childrenDocs = doc.children.filter(
          (child) =>
            child.content.toLowerCase().includes(req.query.q.toLowerCase()) ||
            child.data.title.toLowerCase().includes(req.query.q.toLowerCase())
        );
        if (childrenDocs.length) {
          results.push({
            title: doc.title,
            children: childrenDocs,
          });
        }
      } else {
        if (
          doc.content.toLowerCase().includes(req.query.q.toLowerCase()) ||
          doc.data.title.toLowerCase().includes(req.query.q.toLowerCase())
        ) {
          results.push(doc);
        }
      }
    });
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }));
}
