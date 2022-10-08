export default function makeDocPages() {
  const documentation = [
    {
      label: 'Solver',
      path: 'solver.mdx',
    },
    {
      label: 'Getting Started',
      path: 'getting-started',
      children: [
        {
          label: 'Getting Started',
          path: 'getting-started/index.mdx',
        },
        {
          label: 'C++',
          path: 'getting-started/c.mdx',
        },
        {
          label: 'Julia',
          path: 'getting-started/julia.mdx',
        },
      ],
    },
    {
      label: 'Interface',
      path: 'interfaces',
      children: [
        {
          label: 'Interface',
          path: 'interfaces/index.mdx',
        },
        {
          label: 'Solver Settings',
          path: 'interfaces/solver-settings.mdx',
        },
      ],
    },
    {
      label: 'References',
      path: 'references.mdx',
    },
  ];

  return documentation;
}
