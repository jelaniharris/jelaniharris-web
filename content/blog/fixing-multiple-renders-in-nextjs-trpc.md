---
title: Fixing multiple renders with NextJs and tRPC
date: "2022-08-23T13:00:00.000Z"
tags: ["nextjs", "trpc"]
description: "A post about how to fix multiple rendering issues when using NextJS and tRPC"
featuredImage: ./images/pexels-mo-eid-8347499.jpg
featuredAlt: "Photo by Mo Eid"
featuredAltUrl: "https://www.pexels.com/photo/silhouette-of-person-standing-near-a-doorway-with-bright-light-8347499/"
---

In my [personal starter kit](https://github.com/jelaniharris/JAH-Stack) I am using tRPC with NextJs. I noticed that when I tried to use trcp.useQuery() in an a component I was getting a frustrating amount of multiple renders (two to four at a time).

## Why do my pages render twice, or render multiple times?

After some research I found out that what is happening is React Query is fetching the data on the mounting of the component. 

This also had the side effect of not only changing the data on the screen on every reload, but pinged the backend api twice.

### The solution

Look at your ```_app.tsx``` in your /pages folder. In the ```withTrpc``` section and in the ```config({ ctx }) {``` add this to the return block:

```javascript
queryClientConfig: {
    defaultOptions: {
        queries: {
            refetchOnMount: false,
        },
    },
},
```

## Why is it whenever I click in the window it refetches?

This is because if a default feature in React Query. The [Window Focus Refreshing](https://tanstack.com/query/v4/docs/guides/window-focus-refetching) feature is so that when your user comes back to the page (after browsing in another tab or something) and clicks inside of it React Query will fetch fresh data for you in the background.

Learn about the [important defaults](https://tanstack.com/query/v4/docs/guides/important-defaults) of React Query.

Now, in most cases you will want this on when other users are adding content to your application and you want your user to have the most up to date data. However, in my case I wanted it off so it's as simple as turning off the ```refetchOnWindowFocus``` option:

```javascript
queryClientConfig: {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
},
```

My final _app.tsx looks like this:
```javascript
export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      url: `${getBaseUrl()}/api/trpc`,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  ssr: true,
})(MyApp);
```
