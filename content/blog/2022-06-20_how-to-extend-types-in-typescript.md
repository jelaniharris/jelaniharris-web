---
title: How to extend types in Typescript
date: "2022-06-20T14:00:03.284Z"
modified_date: "2023-09-16T00:11:00.000Z"
tags: ["javascript", "typescript"]
featuredImage: ./images/pexels-kevin-ku-577585.jpg
featuredAlt: "Photo by Kevin Ku"
featuredAltUrl: "https://www.pexels.com/photo/data-codes-through-eyeglasses-577585/"
---

When working with TypeScript, you'll frequently encounter scenarios where you need to merge or enhance existing types to craft a new, specialized one. Fortunately, TypeScript makes this process straightforward and user-friendly.

To extend a type in Typescript, you have multiple options:

## Extend a type using an _intersection_ type

The intersection type helps combine existing types. The intersection type is defined by the `&` operator. You can extend a type with a type, and a type with an interface too.

```typescript

type Animal = {
    name: string;
    sharpTeeth: boolean;
    breathesWater: boolean;
}

interface Creature {
    huntPrey: () => void;
}

// Extend with type
type PetAnimal = Animal & { nickname: string }

// Extend with interface
type PredatorAnimal = Animal & Creature;
```

## Extend an interface using the _extends_ keyword

We can extend interfaces in Typescript by using the extends keyword.

For example we can write:

```typescript
type Profile = {
    name: string,
    email: string,
    created_at: string | Date,
    updated_at: string | Date
}

interface UserProfile extends Profile {
    user_id: number
}
```

## Extend multiple interfaces

Also in TypeScript, you can expand the functionality of a class or type by implementing multiple interfaces. To achieve this, utilize the `extends` keyword and list the interfaces/types you want to incorporate, separating them with commas.

```typescript
type BakedGood = {
    glutenFree: boolean;
    dairyFree: boolean;
}

type DessertGood = {
    frosted: boolean;
}

interface Pastry extends BakedGood, DessertGood {
    filling: string;
}

```

## Extending Classes?

In Typescript you can even extend classes with an interface.

```typescript
class Post {
    private title: string;
    private content: string;
}

interface FrontPagePost extends Post {
    getHeaderImage(): void;
}

```

## Omit a type

You can employ the Omit utility type to override the types of one or more properties when extending another type.

```typescript
type GroceryItem {
    id: string;
    name: string;
    price: number;
    refridgerated: boolean;
}

type BookstoreItem = Omit<GroceryItem, 'refridgerated'> & {
    section: string;
}

// Omit multiple items by using the pipe symbol |
type LibraryItem = Omit<GroceryItem, 'refridgerated' | 'price'> & {
    deweyDecimal: string;
}
```

The Omit utility type creates a fresh type by selecting properties from the given type and excluding the designated keys