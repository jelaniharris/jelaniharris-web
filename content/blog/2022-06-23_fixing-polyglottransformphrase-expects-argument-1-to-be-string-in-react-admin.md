---
title: "Fixing Polyglot.transformPhrase expects argument #1 to be string in react-admin"
date: "2022-06-23T11:19:00.000Z"
tags: ["react-admin", "react"]
featuredImage: ./images/pexels-photo-12334692.jpg
featuredAlt: "Photo by Soly Moses from Pexels: https://www.pexels.com/photo/transformers-sculpture-12334692/"
---

## What does transformPhrase even mean?

So sometimes when I'm trying to save a form in react-admin I see this really annoying error:

> Uncaught TypeError: Polyglot.transformPhrase expects argument #1 to be string

```js
<SimpleForm>
    <ReferenceInput label="Organization" allowEmpty source="organization_id" reference="organizations">
        <SelectInput optionText="name"/>
    </ReferenceInput>
</SimpleForm>
```

The reason why this happens is because the translateChoice option on most inputs is set to true by default, so it tries to find non-existent keys in the I18nProvider.

## The fix

So what you need to do is to set it to be false:

```js
<ReferenceInput label="Organization" allowEmpty source="organization_id" reference="organizations">
    <SelectInput optionText="name" translateChoice={false} />
</ReferenceInput>
```

## What if I want to turn of all translations for react-admin

Sometimes, this doesn't fix the issue and you'll need to recreate the I18nProvider yourself to allow missing keys for things it can't find to translate:

```js
import polyglotI18nProvider from "ra-i18n-polyglot"; // Install this package
import engMessages from "ra-language-english"; // Install this package

const App = () => {
    const i18nProvider = polyglotI18nProvider((locale) => engMessages, "en", {
        allowMissing: true,
        onMissingKey: (key, _, __) => key,
    });

    return (
        <Admin
            ...
            i18nProvider={i18nProvider}
        >
    )
}
```

Learn more about [react-admin's Internationalization](https://marmelab.com/react-admin/Translation.html)

