---
title: Fixing Netlify form problems in Gatsby
date: "2022-06-25T18:49:00.000Z"
tags: ["gatsby", "netlify"]
featuredImage: ./images/pexels-photo-955389.webp
featuredAlt: "Photo by Cytonn Photography from Pexels: https://www.pexels.com/photo/person-holding-gray-twist-pen-and-white-printer-paper-on-brown-wooden-table-955389/"
---

After having a ton of issues getting [Netlify](https://www.netlify.com/)'s form submission to work, I have some tips on how to get it working if you're running into any trouble

## Do not forget the method attribute in the form tag

I've wasted quite a few build minutes on Netlify on this small oversight.

```html
<form name="message-me" method="POST" data-netlify="true">
</form>
```

## Ensure that the hidden field is equal to the name of your form

Although the [documentation claim](https://docs.netlify.com/forms/setup/#html-forms) that this value is automatically injected to forms when the netlify-bot detects the form it never added it for me - nor did it remove the data-netlify stuff as the attribute. I found that it just works better if you add it yourself:

```html
<form name="my-contact-form"  method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="my-contact-form">
</form>
```

## Do not have duplicate input names in your form

Your input elements must have unique names

```html
<form name="my-contact-form"  method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="my-contact-form">
    <input type="text" name="name" placeholder="First Name" />
    <input type="text" name="name" placeholder="Last Name" />
</form>
```

## Do not have a name on the submit button

```html
<form name="my-contact-form"  method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="my-contact-form">
    <input type="text" name="name" placeholder="First Name" />
    <button name="submit" type="submit">Submit Form</button>
</form>
```

Just have no name on it at all:
```html
<button type="submit">Submit Form</button>
```

## Make sure your honey-pot exists

To prevent all sorts of spam, Netlify provides a [honey-pot functionality](https://docs.netlify.com/forms/spam-filters/#honeypot-field) that can reject entries from bots if they fillout a field that isn't visible to humans. I've seen tutorials online that just have the name of the honey pot defined in the form but not have field exist in the form.

```html
<form name="my-contact-form"  method="POST" data-netlify="true" netlify-honeypot="address">
    <p className="hidden d-hidden hide-me-somehow">
        <input name="address" placeholder="Do not fill me out">
    </p>
</form>
```

Also, don't name your honey-pot "bot-field" name it something that your form doesn't need but would sufficiently confuse a bot, like "address", "last-name", "zipcode" etc.

## Set the action attribute correctly

Make sure that the action is set to the page that exists in gatsby (in the /pages folder). I also needed to set the page to be like:
> /page-name/
with a slash at the end in order for gatsby to not complain about it not existing

```html
<form name="contact-form" method="POST" action="/thank-you/" data-netlify="true">
    <input type="hidden" name="form-name" value="my-contact-form">
</form>
```