---
title: Case-insensitive replaceAll in Java
date: "2009-09-10T22:12:03.284Z"
description: "How to use a case-insensitive replaceAll in javascript"
featuredImage: ./images/nathan-dumlao-6VhPY27jdps-unsplash.jpg
featuredAlt: "Photo by Nathan Dumlao on Unsplash"
featuredAltUrl: "https://unsplash.com/@nate_dumlao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
tags: ["java", "regex"]
---

The replaceAll function in the java.lang.String class replaces each substring found in that matches the regular expression to replace.

```java
String sentence = "The sly brown fox jumped over the lazy fox.";
String result = sentence.replaceAll("fox", "doggie");
System.out.println("Input: " + sentence);
System.out.println("Output: " + result);
```

Would output:
> Input: The sly brown fox jumped over the lazy fox.
> Output: The sly brown doggie jumped over the lazy doggie.

However there are cases where we want to replaceall substrings and ignore the case, or make it case insensitive.

```java
String sentence = "The sly brown Fox jumped over the lazy foX.";
String result = sentence.replaceAll("fox", "dog");
System.out.println("Input: " + sentence);
System.out.println("Output: " + result);
```

> Input: The sly brown Fox jumped over the lazy foX.
> Output: The sly brown Fox jumped over the lazy foX.

To create the case sensitive version of replaceAll we do not need to create a new wrapper function or create a utility class somewhere. All we need to do is prepend the Case-insensitve pattern modifier (?i) before our regex to indicate that we don’t care about the case sensitivity of the regex.

```java
String sentence = "The sly brown Fox jumped over the lazy foX.";
String result = sentence.replaceAll("(?i)fox", "dog");
System.out.println("Input: " + sentence);
System.out.println("Output: " + result);
```

> Input: The sly brown Fox jumped over the lazy foX.
> Output: The sly brown dog jumped over the lazy dog.