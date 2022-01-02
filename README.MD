#### Project Setup

In order to RUN the project, in the root create .env with these two variables, with your own values.

MONGO_URI
JWT_SECRET

After that run this command

```bash/powershell
npm install && npm start
```

## Swagger usage

1. in swagger User Interface you will need to get aunthentication first, through either logging in or first register user then log in.

2. add the bearer token to the authentication button then proceed to test all the end points,

Swagger UI

```yaml
/houses/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the house id
```
