---
title: "Sorting an array of objects by a property value in javascript"
date: "2022-06-27T01:11:00.000Z"
tags: ["javascript"]
featuredImage: ./images/pexels-photo-681118.jpg
featuredAlt: "Photo by NEOSiAM  2021 from Pexels"
featuredAltUrl: "https://www.pexels.com/photo/photo-of-ball-pit-balls-681118/"
---

## Sorting using sort()

Lets say that you have an array of objects that you wanted to sort by:

```js
const people = [
    { name: 'Liam', age: 29, created_at: new Date("2022-05-18") },
    { name: 'Adam', age: 34, created_at: new Date("2021-09-23") },
    { name: 'Adam', age: 45, created_at: new Date("2020-03-11") },
    { name: 'Eve', age: 23, created_at: new Date("2020-02-03") },
    { name: 'Peter', age: 45, created_at: new Date("2019-06-08") },
]
```

You can use the sort() method of the Array that uses a callback function. The function takes 2 parameters in the array (commonly called a and b)

```js
const sortedPeople = people.sort((a, b) => a.name > b.name ? 1 : -1)
```

    [
        {
            "name": "Adam",
            "age": 45,
            "created_at": "2020-03-11T00:00:00.000Z"
        },
        {
            "name": "Adam",
            "age": 34,
            "created_at": "2021-09-23T00:00:00.000Z"
        },
        {
            "name": "Eve",
            "age": 23,
            "created_at": "2020-02-03T00:00:00.000Z"
        },
        {
            "name": "Liam",
            "age": 29,
            "created_at": "2022-05-18T00:00:00.000Z"
        },
        {
            "name": "Peter",
            "age": 45,
            "created_at": "2019-06-08T00:00:00.000Z"
        }
    ]

When the callback function returns a 1, the b object is higher in sorting over object a. To reverse this, you can just reverse the 1 and -1.

## Sorting by multiple properties

You could also have it sort by a secondary properties if there is a match in the first property.

```js
const sortedPeople = people.sort((a, b) => a.name > b.name ? 1 : (a.name === b.name) ? ((a.age > b.age) ? -1 : 1) : -1)
```

    [
        {
            "name": "Adam",
            "age": 45,
            "created_at": "2020-03-11T00:00:00.000Z"
        },
        {
            "name": "Adam",
            "age": 34,
            "created_at": "2021-09-23T00:00:00.000Z"
        },
        {
            "name": "Eve",
            "age": 23,
            "created_at": "2020-02-03T00:00:00.000Z"
        },
        {
            "name": "Liam",
            "age": 29,
            "created_at": "2022-05-18T00:00:00.000Z"
        },
        {
            "name": "Peter",
            "age": 45,
            "created_at": "2019-06-08T00:00:00.000Z"
        }
    ]

## Sorting by a date

Now if you want to sort the array by a date. You can still use the sort method:

```js
const sortedPeopleByDate = people.sort((a, b) => b.created_at - a.created_at)
```

By taking the difference between b and a, if it's positive then that means that B is larger so it will be first. 

    [
        {
            "name": "Liam",
            "age": 29,
            "created_at": "2022-05-18T00:00:00.000Z"
        },
        {
            "name": "Adam",
            "age": 34,
            "created_at": "2021-09-23T00:00:00.000Z"
        },
        {
            "name": "Adam",
            "age": 45,
            "created_at": "2020-03-11T00:00:00.000Z"
        },
        {
            "name": "Eve",
            "age": 23,
            "created_at": "2020-02-03T00:00:00.000Z"
        },
        {
            "name": "Peter",
            "age": 45,
            "created_at": "2019-06-08T00:00:00.000Z"
        }
    ]

## Things to keep in mind about sort()

Although sort() returns a newly sorted array, it also modifies the original array in it's place. If you want to prevent the original array from changing, you could sneak in a slice() to force javascript to create a copy of the array before sorting.

```js
const sortedPeopleByAge = people.slice().sort((a, b) => a.age > b.age ? 1 : -1)
```
