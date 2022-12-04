# Reddit Clone

Fullstack Nest, Next Reddit-like app with API for auth, subredits, commenting, posting and voting for posts

# Usage

###  0.
Create **``.env``** file in **``server``** root directory and fill with following:

```code
# DATABASE
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=admin
DATABASE_PASSWORD=admin
DATABASE_DBNAME=nest-next-reddit-postgres

# SERVER
PORT=5000
ORIGIN=http://localhost:3000

# JWT
JWT_ACCESS_TOKEN_SECRET=secret1
JWT_ACCESS_TOKEN_EXPIRATION_TIME='10m'
JWT_REFRESH_TOKEN_SECRET=secret2
JWT_REFRESH_TOKEN_EXPIRATION_TIME='30d'
``` 

## With Docker

### 1. Run containers
```bash
docker compose up 
```

## Without Docker
### 1. Change contents of ``DATABASE`` in env file
```code
# DATABASE
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_DBNAME=
```

### 2. Install Server dependencies and run
```bash
cd server
```
```bash
npm install/pnpm install/yarn
```
```bash
nest start --watch
```

### 3. Install Client dependencies and run
```bash
cd client
```
```bash
npm install/pnpm install/yarn
```
```bash
next dev
```




## FEATURES
- Basic auth
- Creating subreddits
- Creating posts
- Commenting
- Voting on posts and comments

## DISCLAIMER
Project is discountinued in favor of newer ones

## License
[ISC](https://opensource.org/licenses/ISC)
