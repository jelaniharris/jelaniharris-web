---
title: How to read remote files using PHP
date: "2010-12-08T22:12:03.284Z"
tags: ["php"]
---
When I was implementing pingback functionality in my custom blogging software, I needed to read files from a remote server.

As long as allow_url_fopen is enabled in your php.ini configuration you can use HTTP and FTP urls with a majority of the functions that use a filename as a parameter.

I found that there are 3 ways to read remote files using PHP.

## fopen
```php
if ($filepointer = fopen("http://banditrevolvers.com", "r")) {
     $site_content = "";
 
     //While we still have content to read, append it
     //1k at a time
     while ($line = fread($filepointer, 1024) {
          $site_content .= $line;
     }
 
} else {
     //Error occured while trying to read the url
}
 
fclose($filepointer);
```

## fgets and fread

```php
if ($filehandle = fopen("http://banditrevolvers.com", 'r') {
 
     while(!feof($filehandle)) {
          $readline = fgets($filehandle, 1024);
          if (eregi("<title>(.*)</title>", $readline, $output) {
               $title = $output[1];
               break;
          }
     }
} else {
     //Error occured while trying to read the url
}
 
echo "Title of the page is: " . $title;
 
fclose($filehandle);
```

### Wait what’s the difference between fgets and fread?

Glad you noticed that. The truth is that fread is the more preferable function to use when reading (or in this case streaming) data from a remote file. The reason is because the fgets function reads a line at a time. For example, if you had a 2000 line file that was only 35k in size, it would loop 2000 times with fgets. However it would only loop 35 times with fread (assuming a 1k buffer).

Then again, if you need to read a file one line at a time fgets is the function you’ll need.

## File_get_contents

This function will return the contents of a file in a string. To use it just specify a URL as a parameter. Be sure to check the return value to see if it was successful or not.

```php
$content = file_get_contents("http://jelaniharris.com");
 
if ($content !== false) {
     //Do something with the content
} else {
     //An error occurred
}
```

## CURL

Not all web hosts have the CURL library in their installation. Thus we have to check to see if the function exists before we attempt to use it.

```php
if (function_exists('curl_init')) {
     //Initialize a new resource for curl
     $ch = curl_init();
 
     //Set the url the retrieve
     curl_setopt($ch, CURLOPT_URL, 'http://banditrevolvers.com');
 
     //Return the value instead of outputting to the browser
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
 
     $contents = curl_exec($ch);
     curl_close($ch);
 
     if ($contents) {
          //Do stuff with the contents
     } else {
          //Show error message
     }
 
}
```