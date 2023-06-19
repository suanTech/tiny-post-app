# Tiny Post App

* live demo <a href="https://tiny-post-app.vercel.app/" target="_blank" rel="noopener">here</a>


## Introduction

A Blog App built with Next.js 13, React Query, TypeScript and Sass as frontend and Prisma and PostgreSQl(hosted on Railway) as backend.

## 🗝️ Features

* Built with Next.js 13's new feature "app" directory
* Sign in with google account using NextAuth/Auth0
* Create database(postgreSQL) models with prisma schema
* Implement CRUD using React Query and Axios
    - user can Create, Read, Update and Delete their posts
    - user can add comments to any posts
* Error handling with useMutation hook + react hot toast
* Use Sass modules throuout the app
* Use Sass mixins and variables for reusable styles
* Add notification using react hot toast
 - loading, error, success
* Completely responsive 🙌

## 🔍 Why I chose what I chose ?
1. Next.js
  * Allows building and deploying full-stack apps without separate server-side code.
2. TypeScript
  * Enables writing more precise code with enhanced type checking.
  * Provides better error handling and auto completion, which benefits code quality and developer productivity.
3. SCSS(Sass)
  * Provides advanced CSS features like mixins and functions for easy style control and manipulation.
  * Offers a powerful CSS writing experience.
4. Prisma
  * Simplifies database setup with its existing schema.
  * Has easy integration and management of database.
5. NextAuth
  * Simplifies authentication process.
  * Offers option to integrate with various providers.
6. React Query
  * Handles API requests for CRUD operation efficiently and offers data synchronisation.
  * Provides efficient error handling such as the useMutation hook.
## 📀 Database Schema
![schema](./public/schema-diagram.png)

## 📸 Screenshots
<img src="https://imgur.com/hLy3Pad.jpg" width="350" height="auto">

## 🛠️ Tech Stack
![techStack](https://imgur.com/bULrrqm.png)

## Dependencies
* React-Hot-Toast
* Axios
* Prisma

##  🌪️ Troubleshooting

###  Error: Invalid src prop error when loading image from google account

**Error Message**

```
Error: Invalid src prop (https://lh3.googleusercontent.com/a/AGNmyxZC07km7Uhz-TB_g0zKePq2GhmlUtt2HcOIRFNXBQ=s96-c) 
on `next/image`, hostname "lh3.googleusercontent.com" is not configured under images in your `next.config.js`
```

**Problem**

(According to Next.js docs,) One of your pages that leverages the next/image component, passed a src value that uses a hostname in the URL that isn't defined in the `images.remotePatterns` in `next.config.js`.

**Solution**
Update next.config.js file(add image domains to be directed)
```js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"]
  },
}
```
###  Error: React Query type error

**Error Message**

```jsx
Type error: Type 'string | string[] | undefined' is not assignable to type 'string | undefined'.
```

**Problem**

The web address protocols allows assigning of multiple query names with the same name. These then get passed as a string[] instead of a single string.
E.g, `?value=one&value=two.` Therefore it should be up to the app to decide which value to accept if it's only going to make use of one string.

**Solution**
Type narrowing using `Array.isArray` checking
```ts
const postId = Array.isArray(req.query.details) ? req.query.details[0] : req.query.details
      const data = await prisma.post.findUnique({
        where: {
          id: postId
        },
```

## 🔜 Future Challenge
- [ ] Testing app 
- [ ] Add other authO options for sign in