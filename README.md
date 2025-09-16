This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables

This project requires the following environment variables to be set in your `.env.local` file:

### Database Configuration

- `DB_USER` - MongoDB username for database connection
- `DB_PASSWORD` - MongoDB password for database connection
- `DB_URL` - MongoDB cluster URL (without the mongodb+srv:// prefix)

### Authentication (Google OAuth)

- `GOOGLE_CLIENT_ID` - Google OAuth 2.0 client ID from Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - Google OAuth 2.0 client secret from Google Cloud Console
- `AUTH_SECRET` - Secret key for NextAuth.js token signing (required in production)

### Admin Configuration

- `ADMIN_EMAIL` - Email address of the user who should have admin privileges

### Example .env.local

```
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_URL=your_cluster.mongodb.net/your_database_name

GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=your_random_secret_key_here

ADMIN_EMAIL=admin@example.com
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
