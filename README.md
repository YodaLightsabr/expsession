# Expsession
Expsession is an easy way to handle sessions in Node.js and Express. With one line of code, you can manage sessions for each user and store data for that session.

## Quick setup
After installing the package, just use this one line to get it going:
```js
// ...
require('expsession')(app);
// ...
```

## Documentation

### Req.session.get(key)
Get the key from the session

### Req.session.set(key, value)
Set a value on the session

### Req.session.getAll()
Get the entire object of data for a session

### Res.logout()
Log out of a session, regenerate a cookie, and clear all data


------------------
**❗ Disclaimer:** Expsession is not meant for use in production applications. It is just an easy way to add sessions to a project.