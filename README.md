# Pc Parts Api

Open Source PC Parts api.

Made with GraphQL and MongoDB.

## MongoDB
Current entries can be found at https://mongodb.xandervos.nl/.<br>
Write access is not available on the website.

## GraphQL
To interface with the current capabilities of the api go to https://mongodb.xandervos.nl/graphql.<br>
If you want to add items to the database, you need to have an account that is verified.<br>
To verify an account, send an email with your username and email to **2001xvos@gmail.com**.

Once you are verified, execute the login mutation which will give you a JWT token.<br>
Add this token to the HTTP headers like the following.<br>

```
{
    "Authorization": "Bearer <token>"
}
```