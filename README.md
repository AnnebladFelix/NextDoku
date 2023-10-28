# NextDoku

A school project for creating documents using the WYSIWYG editor Tiny. 
Created using nextjs 13 and prisma with mySQL.

## Run Locally

### Clone the project

```bash
  git clone https://github.com/AnnebladFelix/NextDoku.git
```

### Go to the project directory

```bash
  cd NextDoku
```

### Install dependencies

```bash
  npm install
  # or
  yarn install
  # or
  pnpm install
```

### Add .env

Add .env file to the root folder.
Add: 
DATABASE_URL="mysql://(your username, often "root" with mysql):(YourSecretPassword)@localhost:3306/(Your db name)"
and: 
TINY_KEY="Your tinyMCE api key"
which you can get from their website here: [TinyMCE.](https://www.tiny.cloud/blog/how-to-get-tinymce-cloud-up-in-less-than-5-minutes/)

### Set up your MySQL server
I have used MySQL Community Server and DataGrip but you can set it up the way that you feel suits you the best.

You can follow my steps here.
Open your MySQL server if you don't have MySQL Community Server you can download it from their website here: [MySQL.](https://dev.mysql.com/downloads/mysql/)
Just follow the setup steps from the exe and start the app and follow the steps there. 
With this Your username will be "root" and you have to use the password you set there in your DATABASE_URL that you have setup in the 
.env file.
Now create your database with user root and your password on localhost and port 3306 and set a db name.

### Add the migration.sql

```bash
  npx prisma migrate dev
```

### Start the server 

```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Dependencies

- Next.js 13
- Tailwind
- radix-ui
- classnames
- react-icons
- Prisma
- Zod
- TinyMCE
- Axios

## Author

- [@AnnebladFelix](https://github.com/AnnebladFelix)
