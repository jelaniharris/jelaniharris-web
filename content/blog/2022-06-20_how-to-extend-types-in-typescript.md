---
title: How to extend types in Typescript
date: "2022-06-20T14:00:03.284Z"
tags: ["javascript", "typescript"]
featuredImage: ./images/pexels-kevin-ku-577585.jpg
featuredAlt: "Photo by Kevin Ku"
featuredAltUrl: "https://www.pexels.com/photo/data-codes-through-eyeglasses-577585/"
---

## Use an interface (Typescript 2.2+)

We can extend types in Typescript by using the extends keyword
For example we can write:

```typescript
type Profile = {
    name: string,
    email: string,
    created_at: string | Date,
    updated_at: string | Date
}

interface UserProfile extends User {
    user_id: number
}
```

## Use an intersection type

```typescript
type UserProfile = Profile & { user_id: number }
```
