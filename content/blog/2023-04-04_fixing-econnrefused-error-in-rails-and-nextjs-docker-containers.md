---
title: Fixing ECONNREFUSED error in Rails and NextJS Docker Containers
date: "2023-04-04T19:40:00.000Z"
tags: ["rails", "nextjs"]
featuredImage: ./images/pexels-min-an-749061.jpg
featuredAlt: "Photo by Min An"
featuredAltUrl: "https://www.pexels.com/photo/red-and-white-roller-coaster-on-railings-749061/"
---
I'm in the early stages of creating my application that uses NextJs as a frontend and Rails as the Api backend, when I realized that I couldn't NextJs to talk to my api:

```
frontend    | AxiosError: connect ECONNREFUSED 127.0.0.1:4000
frontend    |     at AxiosError.from (file:///usr/app/node_modules/axios/lib/core/AxiosError.js:89:14)
frontend    |     at RedirectableRequest.handleRequestError (file:///usr/app/node_modules/axios/lib/adapters/http.js:577:25)
frontend    |     at RedirectableRequest.emit (node:events:525:35)
frontend    |     at eventHandlers.<computed> (/usr/app/node_modules/follow-redirects/index.js:14:24)
frontend    |     at ClientRequest.emit (node:events:513:28)
frontend    |     at Socket.socketErrorListener (node:_http_client:502:9)
frontend    |     at Socket.emit (node:events:513:28)
frontend    |     at emitErrorNT (node:internal/streams/destroy:151:8)
frontend    |     at emitErrorCloseNT (node:internal/streams/destroy:116:3)
frontend    |     at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
frontend    |   port: 4000,
frontend    |   address: '127.0.0.1',
frontend    |   syscall: 'connect',
frontend    |   code: 'ECONNREFUSED',
```

At first I thought i had something misconfigured, on the NextJs side - but this is actually on the Ruby on Rails side. I was able to communicate with my api using the web browser directly or with [Postman](https://www.postman.com/) so I knew it had to be NextJs.

After some research, trial, and error I finally got my NextJs app talking to my rails api. Here's how I did it:

# What is Host Authorization?

Rails has a feature where it can stop DNS rebinding and other host style attacks by allowing you to provide a whitelist of all of the valid hosts that can comminicate with your rails application. This is called the [HostAuthorization](https://guides.rubyonrails.org/configuring.html#actiondispatch-hostauthorization) configuration.

Whenever we are using the getServerSideProps to perform communication with your api, it's needs the url of the container's service.

My compose-docker file looks like this:
```dockerfile
version: '3'
services:
  db:
    image: postgres:14.2-alpine
    container_name: magician-db
    env_file: "./rails-server/.env"
    ports:
      - "5430:5432"
    volumes:
      - "magician-db:/var/lib/postgresql/data"
  api:
    build: ./rails-server
    command: "bundle exec rails s -p 4000 -b 0.0.0.0"
    env_file: "./rails-server/.env"
    volumes:
      - "./rails-server:/app:cached"
      - gem_cache:/gems
    ports:
      - 4000:4000
    depends_on:
      - db
  frontend:
    image: node:18-alpine
    container_name: frontend
    build: ./client
    user: "node"
    env_file: "./client/.env.local"
    volumes:
       - ./client:/usr/app:cached
       - node_modules_client:/usr/app/node_modules
    command: yarn dev
    ports:
      - 3000:3000
    depends_on:
      - api
networks:
  default:
    name: magician_default
volumes:
  magician-db:
  gem_cache:
  node_modules_client:
```

# Edit the config.hosts

Add the name of the docker-compose container in the ==Rails.application.config.hosts== configuration. For my example, my rails api in my docker-compose file is just called ==api==:

Add to environments/development.rb in your rails folder
```
  # Needed for Next.js's getServerSideProps
  config.hosts << "api"
```

# Change the NextJs Url

Once you have the backend fixed to support the host, now you need to change the environment variable that you're using for the NextJs api calls to match. You have to have two api urls. One is for the server api url which is used for the container-to-container connection, the other is used for the browser-to-api connection (in case you didn't want to use getServerSideProps).

```
# DEVELOPMENT TOOLS
# Ideally, don't add them to production deployment envs
# !STARTERCONF Change to true if you want to log data
NEXT_PUBLIC_SHOW_LOGGER="false"
NEXT_SERVER_API_URL="http://api:4000"
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

I'm imagining that if I'm setting this up in the cloud, that those two urls would point to the same url. But in developer mode working in docker, having them separated worked well for my purposes.

# Change the next.config.js

Add these two configuration options to the ```next.config.js``` file. 

```js
  serverRuntimeConfig: {
    apiUrl: process.env.NEXT_SERVER_API_URL
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL
  },
```

# Create a single service file

I made a single service file in a folder called ```services``` where I stick all of my model, react-query and api calls. I have a single api file, that I use to access my api using axios:

My ```services/api.ts```:
```js
  import axios from 'axios';
  import getConfig from 'next/config';

  // Get our configuration of our runtimes
  const {serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  // Use the correct url depending on if it's server or public
  const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl;

  // Create the axios instance
  const api = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
      Accept: 'application/json',
    },
  });

  export { api };
```

The serverRuntimeConfig is only available on the server-side, and the publicRuntimeConfig is available server-side and client-side. So when I'm getting my axios instance and I'm in a getServerSideProps call, I'm getting the one that has the server api (NEXT_SERVER_API_URL). Then

# And that's it

Once I had those changes in place, I was able to properly communicate to my backend using docker. I'm hoping this helps.