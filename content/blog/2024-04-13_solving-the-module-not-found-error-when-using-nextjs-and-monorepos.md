---
title: Solving the Module Not Found error when using NextJS and MonoRepos
date: "2024-04-13T10:15:30Z"
modified_date: "2024-04-13T10:15:30Z"
tags: ["nextjs", "t3", "monorepo"]
featuredImage: ./images/pexels-ann-h-3482441.jpg
featuredAlt: "Photo by Ann H"
featuredAltUrl: "https://www.pexels.com/photo/pink-jigsaw-puzzle-piece-3482441/"
---

I’m using the T3 stack to begin work on my movie application and I wanted to use ShadCN for the baseline of my components. I had another package called ui in which I was going to store all of my ShadCN components and then reference those in my nextJS application.

I went through the normal installation process for getting ShadCN installed, added a few new components, exported them in my package.json and attempted to use them in my app. But then I ran into this error:

```jsx
@acme/nextjs:dev:  ⚠ Fast Refresh had to perform a full reload due to a runtime error.
@acme/nextjs:dev:  ⨯ ../../packages/ui/src/components/ui/form.tsx:13:0
@acme/nextjs:dev: Module not found: Can't resolve '~/components/ui/label'
@acme/nextjs:dev:   11 | } from "react-hook-form";
@acme/nextjs:dev:   12 |
@acme/nextjs:dev: > 13 | import { Label } from "~/components/ui/label";
@acme/nextjs:dev:   14 | import { cn } from "../../lib/utils";
@acme/nextjs:dev:   15 |
@acme/nextjs:dev:   16 | const Form = FormProvider;
@acme/nextjs:dev:
@acme/nextjs:dev: https://nextjs.org/docs/messages/module-not-found
```

What do you mean you can’t resolve it? It’s right there! So I took a quick peek around my configuration and saw how I had shadcn configured in my ui directory to use the following components.json:

```jsx
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "../../apps/nextjs/src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils"
  }
}
```

As you can see I have the ~ used as my path alias. I also have this setup in my tsconfig.json file in the ui package.

```jsx
{
  "extends": "@acme/tsconfig/internal-package.json",
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "ES2022"],
    "jsx": "preserve",
    "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo.json",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    },
  },
  "include": ["*.ts", "src"],
  "exclude": ["node_modules"]
}

```

This allows the downloaded components from the Shadcn to refer to other components and the utility folder easily.

```tsx
import { Label } from "~/components/ui/label"
import { cn } from "~/lib/utils"
```

After some research about how all of these aliases, monorepos, building and exporting works I found out the reason why I was running into that error. It was because when my nextjs code was including the components the alias name was looking into it’s internal path of ./src/\* and not the one in the package.

I added the source paths of the ui package to the nextjs app tsconfig.json file:

```jsx
{
  "extends": "@acme/tsconfig/base.json",
  "compilerOptions": {
    "lib": ["es2022", "dom", "dom.iterable"],
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*", "../../packages/ui/src/*"]
    },
    "plugins": [{ "name": "next" }],
    "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo.json",
    "module": "esnext"
  },
  "include": [".", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Because the I was using the same path alias symbol for my NextJS paths and my package ui paths, I just added the package paths to the end of the array.

Next.js can pick up the paths automatically from the tsconfig.json file, and all I had to do was to restart the server after I made a change to that file.

Once I did this, my app started working again and now I could refer to shadcn components and could have all them stored in a separate package in my project.
