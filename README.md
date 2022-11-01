# ALTRO Website

## Content Management Structure

This website is set up to allow the ALTRO team to make changes easily to the home page, citing page, and documentation pages. Everything you will need is within the content directory of this repository. Inside this directory you will find a directory for all your pages:

- Citing
- Docs
- Home

Changing the contents within these directories and pushing up your changes to the main branch will automatically deploy those changes to your site.

### Citing Directory

The citing directory includes the citing.mdx file. This markdown file will display the content on the url '/citing'. Easily add or remove markdown, push up changes, and see the citing page change.

### Docs Directory

The docs directory consists of a nested structure of files and directories. It should be nested according to how it will be nested on the docs page. This is mainly for organization so you can easily configure your doc-config.json file by the same structure in your docs directory. You can fill out that page with whatever markdown/html you would like. It will display both markdown syntax and html syntax. The application supports github flavored markdown so feel free to use any syntax from [https://github.github.com/gfm/](https://github.github.com/gfm/). After making changes, you will have to refresh the browser when testing on your local environment. The markdown-example.mdx file within docs directory is there to show examples in markdown.

#### MathJax

The markdown page can easily handle mathjax like so:

```
$$
\begin{aligned}
  \min_{x_{0:N},u_{0:N-1}} \quad & \ell_f(x_N) + \sum_{k=0}^{N-1} \ell_k(x_k, u_k, dt) \\
  \textrm{s.t.}            \quad & x_{k+1} = f(x_k, u_k), \\
                                & g_k(x_k,u_k) \in \mathcal{K}, \\
                                & h_k(x_k,u_k) = 0.
\end{aligned}
$$

```

### Code Syntax Highlighting

Code blocks will be automatically highlighted when the programming name is placed right after the code block ticks like so: ```juila. If there is no programming language, the code block will be unstyled.

### Doc-config.json

The doc-config.json file is to order how the documents will be placed in the documentation. This is a very important step because if it is not included in the config file, it will NOT show up on the page. It is written in JSON format of doc objects with properties of label, path, and children. The label will be placed as the title on the left navigation panel of docs page. The path is to the mdx file so if your mdx file is nested directly in docs root directory it will be `[docName].mdx`. Your url path name is basically your file name. If it is nested doc, it will be placed within the children of that object as so:

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
- Sponsors

## Set up Local Environent

To set up your local environment to see changes on your own server before pusing up changes, please follow the steps:

If you do not have node installed on your computer, you can download node from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

First, install packages by moving into root directory of repository and running the following command:

```bash
npm install
```

You will only have to do this once. A directory called node_modules should be created locally and you should not ever have to repeat this command unless you are updating your node_modules or you deleted this directory.

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You will have to run this command everytime you want to run your development server.

You can start editing the page by modifying `content/*/*.mdx`. The page updates as you edit the file and refresh.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/search](http://localhost:3000/api/search). This endpoint can be edited in `pages/api/search.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Search functionality

The search functionality of documentation is cached.

If `npm install` was ran, then cache will be automatically updated when you make a new commit. If not, then the cache will not be updated if content in docs was changed. Search functionality then will not be up to date with current doc content. You can always manually update cache by running `npm run cache-docs`.

## Deployed on Vercel

This Next.js app is deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
