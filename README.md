# ALTRO Website

## Content Management Structure

This website is set up to allow the ALTRO team to make changes easily to the home page, citing page, and documentation pages. Everything you will need is within the content directory in this repository. Inside this directory you will find a directory for all your pages:

- Citing
- Docs
- Home

Changing the contents within these directories and pushing up your changes, will automatically deploy those changes to your site.

### Citing Directory

The citing directory includes the citing.mdx file. This markdown file will display the content on the url '/citing'. Easily add or remove markdown, push up changes, and see citing page change.

### Docs Directory

The docs directory has many files and directories. It needs to be nested according to how it will be nested on the docs page with the url of '/docs/[doc]/[subdoc]'. On the top of each markdown file in the docs directory, you will need to include the title and slug. The title is for how you want your document to be labled and displayed on searching. The slug will be for the url that will point to that markdown document.

    ---
    slug: solver
    title: Solver
    ---

If the markdown file is a nested doc, label the slug nested under the parent name as so:

    ---
    slug: getting-started/index
    title: Getting Started
    ---

After you include the slug and title, you can fill out that page with whatever markdown you would like.

#### MathJax

If you are including mathjax in the markdown file, MathJax tags are required around content:

    <MathJax>

    Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
    equation.

    $$
    L = \frac{1}{2} \rho v^2 S C_L
    $$

    Given a **formula** below

    $$s = ut + \\frac{1}{2}at^{2}$$

    Calculate the value of $s$ when $u = 10 $$\\frac{m}{s}$ and $a = 2\\frac{m}{s^{2}}$ at $t = 1s$$

    </MathJax>

### Doc-config.json

The doc-config.json file is for you to order how the documents will be placed in the documentation. This is a very important step because if it is not included in the config file, it will NOT show up on the page. It is in JSON format of doc objects. Each doc object must have a label and path. The path is to the mdx file from the docs directory and must match the slug within that file with the mdx extension. If it is nested doc, it will be placed within the children of that object as so:

```
[
  {
    "label": "Solver",
    "path": "solver.mdx"
  },
  {
    "label": "Getting Started",
    "children": [
      {
        "label": "Getting Started",
        "path": "getting-started/index.mdx"
      },
      {
        "label": "C++",
        "path": "getting-started/c.mdx"
      },
      {
        "label": "Julia",
        "path": "getting-started/julia.mdx"
      }
    ]
  },
  {
    "label": "Interface",
    "children": [
      {
        "label": "Interface",
        "path": "interfaces/index.mdx"
      },
      {
        "label": "Solver Settings",
        "path": "interfaces/solver-settings.mdx"
      }
    ]
  },
  {
    "label": "References",
    "path": "references.mdx"
  }
]
```

### Home Directory

The home directory includes a home.json file that will include the content that is being used on the home page. Here you can control the following on home page:

- Sentences the typewriter is typing
- Features
- Graph title and description
- Graph picture
- Contributors

## Set up Local Environent

To set up your local environment to see changes on your own server before pusing up changes, please follow the steps:

If you do not have node installed on your computer, you can download node from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

First, install packages by moving into root directory of repository and running the following command:

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `content/*/*.mdx`. The page updates as you edit the file and refresh.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/search](http://localhost:3000/api/search). This endpoint can be edited in `pages/api/search.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Search functionality

The search functionality of documentation is cached.

If `npm install` was ran, then cache will be automatically updated when you make a new commit. If not, then the cache will not be updated if content in docs was changed. Search functionality then will not be up to date with current doc content. You can always manually update cache by running `npm run cache-docs`.

## Deployed on Vercel

This Next.js app is deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
