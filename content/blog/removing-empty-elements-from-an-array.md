---
title: Removing empty elements from an array
date: "2010-04-04T22:12:03.284Z"
tags: ["javascript", "php"]
---

When dealing with tag inputs from users, I find myself having to make sure they they don’t enter in any blank or empty tags. Then I realized that I needed to find out how to remove undesirable elements not only from the Php side, but also from the Javascript side as well. Thus, here are some functions that may help some other people out if they’re searching for similar functionality.

## In PHP

```php
    foreach ($my_array as $key =&gt; $value) {
      //We check to make sure that the value is either null or just an empty string
      if (is_null($value) || $value=="") {
        unset($my_array[$key]);
      }
    }
```

An easier way to clean arrays is to use php’s array_filter function without a callback parameter. By default that function is set to remove elements that contain a false (or a 0), null or a “”. I mean seriously, look at how much cleaner it is:

```php
   //This prunes out 'false', '0', 'null' or ''
   $my_array = array_filter($my_array);
```

## In Javascript

We can mimic the functionality of Php’s array_filter in Javascript by using the Array.filter function.

```js
   var my_array = [1,2,3,'4','', 0, null, 'false'];
   function emptyElement(element) {
	//Removes nulls, zeros (also falses), text version of false, and blank element
	if (element == null || element == 0 || element.toString().toLowerCase() == 'false' || element == '') {
		return false;
		else return true;
	}
 
	var my_array = [0,'false',1,null, 2,'',3,'4',false];
	my_array = my_array.filter(emptyElement);
   }
```

Then my_array will include 1,2,3,4.

I hope this was somewhat useful.