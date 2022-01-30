# nest-next-reddit
Fullstack Nest, Next reddit-like training app

## Usage

Run Docker containers and use the package manager (**yarn** or **npm**) to install dependencies in server and client directories.

### 1. Docker
```bash
cd server 
```
```bash
docker-compose up 
```

### 2. Server setup
```bash
cd server 
```
```bash
npm install 
# OR 
yarn
```

####  2.1
Create ``.env`` file in server root directory and fill with following:

```code
# DATABASE
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_DBNAME=

# SERVER
PORT=
ORIGIN=

# JWT
JWT_ACCESS_TOKEN_SECRET=
JWT_ACCESS_TOKEN_EXPIRATION_TIME=
JWT_REFRESH_TOKEN_SECRET=
JWT_REFRESH_TOKEN_EXPIRATION_TIME=
``` 

### 3. Client setup
```bash
cd client 
```
```bash
npm install 
# OR 
yarn
```

## License
[ISC](https://www.isc.org/licenses/)
