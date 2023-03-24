---
title: How to install packages from GitHub using NPM
date: "2022-11-05T12:00:00.000Z"
tags: ["npm", "github"]
featuredImage: ./images/pexels-cottonbro-studio-4553183.jpg
featuredAlt: "Photo by cottonbro studio"
featuredAltUrl: "https://www.pexels.com/photo/person-in-black-leather-boots-lying-on-brown-cardboard-boxes-4553183/"
---

Using the npm registry is not the only source that we can use to install packages into our applications. NPM also has the ability to install from a remote git url as long as the repository has a package.json file in it's root directory.

```bash
npm install prisma tailwindcss nextjs
```

## Installing from GitHub

For example, you could install the same prisma package from it's GitHub repo:

```bash
npm install https://github.com/prisma/prisma
```

## Installing a specific branch from Github

You can choose to install a specific branch by adding ```/tree/[branch]``` to your url, where branch is the release number.

For example, if you wanted 4.3.1 of Prisma:

```bash
npm install https://github.com/prisma/prisma/tree/4.3.1
```

## Installing a specific commit from GitHub

You can also use a commit by adding ```/tree/[commit]``` to your url:

```bash
npm install https://github.com/prisma/prisma/tree/333dd87a879
```

## Installing using a GitHub URI

You can also use the Github URI to install a package. This will resolve the uri to a url.

```bash
npm install github:prisma/prisma
```

The uri ```github:prisma/prisma``` will now resolve to ```https://github.com/prisma/prisma``` and install the prisma package for you.

## What do they look like in the package.json

```javascript
{
  "dependencies": {
    "prisma": "github:prisma/prisma#333dd87a879",
    "express" : "github:expressjs/express#4.18.2",
    "next" : "github:vercel/next.js",
  }
}
```

When you do not provide a specific branch or commit, the installation will assume that you are using the default branch (main or master)