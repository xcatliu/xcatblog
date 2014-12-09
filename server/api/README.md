XcatLiu API
===

Overview
---

This doc described the API for [xcatliu.com].

The entrance is [api.xcatliu.com], which use [api.github.com] as a standard. But go with those difference:

- As a mostly static website, we only accept `GET` method
- Do not have OAuth implement
- Use `http` protocol instead of `https`
- In order to achieve maximum performance, all API have an one-hour-cache
- As you can see, pretty simple

Table of Contents
---

- Posts
- Categories
- Tags
- 404

Posts
---

### List posts

```
GET /posts
```

### Get a single post

```
GET /posts/:id
```

Categories
---

Tags
---

404
---

Links
---

- [xcatliu.com]
- [api.xcatliu.com]
- [api.github.com]

[xcatliu.com]: http://xcatliu.com
[api.xcatliu.com]: http://api.xcatliu.com
[api.github.com]: https://api.github.com