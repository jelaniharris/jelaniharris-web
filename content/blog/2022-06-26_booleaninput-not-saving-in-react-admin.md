---
title: BooleanInput not saving in React-Admin
date: "2022-06-26T14:19:00.000Z"
tags: ["react-admin", "react"]
featuredImage: ./images/pexels-photo-927546.jpg
featuredAlt: "Photo by Steve Johnson from Pexels: https://www.pexels.com/photo/white-wall-927546/"
---

So I was having an issue in [react-admin](https://marmelab.com/react-admin/) where the value of [BooleanInput](https://marmelab.com/react-admin/BooleanInput.html) (e.g. a checkbox slider) was not saving to my backend. 

Specifically when I left the input as unchecked when creating a new entry it wouldn't pass the parameter of that checkbox (unchcked so false or 0) in the post body. I'm assuming that because this value had no value (null) then it didn't see the need to send it.

To get around this, all I needed to do was to force the BooleanInput to be false by default, and then it was properly sending false to my backend if I left it unselected.

```js
<BooleanInput source="is_proprietary" defaultValue={false} />
```

I'm hoping this helped someone out there.