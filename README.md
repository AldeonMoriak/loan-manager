# Loan Manager Web App

Welcome to the Loan Manager web application repository! Loan Manager is a self-managed web application that helps you track loans and their payment dues. This repository contains the source code for the Loan Manager app, and it's designed to be deployed on platforms like Vercel and Supabase.

## Prerequisites

Before you can deploy and use the Loan Manager web app, you'll need the following:

1. **Vercel Account**: You must have an account on [Vercel](https://vercel.com/). Vercel will be used for hosting and deploying the front-end of the Loan Manager app.

2. **Supabase Account**: You need an account on [Supabase](https://supabase.io/). Supabase will be used to store and manage the data related to loans and payment dues.

## Deployment

To deploy the Loan Manager app, follow these steps:

1. [Create a new Vercel account](https://vercel.com/signup) if you don't have one.

2. After creating your Vercel account, follow these steps to deploy the app:

   - Click on the **New Project** button in your Vercel dashboard.
   - Choose the option to import a Git repository.
   - Provide access to this repository by connecting it to your GitHub account.
   - Configure the deployment settings as needed (e.g., environment variables).
   - Deploy the app.

3. Once the deployment is complete, Vercel will provide you with a unique URL for your deployed Loan Manager app.

## Configuration

Before you start using the deployed Loan Manager app, make sure to set the following environment variables:

- `VITE_SUPABASE_URL`: Your Supabase URL.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key.

These environment variables should be configured in your Vercel project settings to ensure that the app can connect to your Supabase database.

## Database Setup

To set up the necessary database tables for the Loan Manager app, you can use the following SQL queries in your Supabase project:

**Query 1: Create the `loans` Table**

```sql
create table
  loans (
    id uuid not null default uuid_generate_v4 (),
    created_at timestamp with time zone null default now(),
    name character varying null,
    portion double precision null,
    total_amount double precision null,
    month_day character varying null,
    user_id uuid null,
    is_complete boolean null default false,
    constraint loans_pkey primary key (id),
    constraint loans_id_key unique (id),
    constraint loans_user_id_fkey foreign key (user_id) references auth.users (id)
  );
```

**Query 2: Create the `transactions` Table**

```sql
create table
  transactions (
    id integer generated by default as identity,
    created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
    name text null,
    amount integer null,
    loan_id uuid not null,
    user_id uuid not null,
    constraint transactions2_pkey primary key (id),
    constraint transactions2_loan_id_fkey foreign key (loan_id) references loans (id) on delete cascade,
    constraint transactions2_user_id_fkey foreign key (user_id) references auth.users (id)
  );
```

These queries will create the necessary `loans` and `transactions` tables in your Supabase project. The tables are designed to store data related to loans and transactions for your Loan Manager web app. Make sure to set up the appropriate relationships and constraints between these tables as specified in the queries.

## Usage

With the Loan Manager app deployed and the database tables created, you can start using it to track loans and payment dues. Add, update, or delete loan records as needed, and the data will be stored securely in your Supabase database.

## Acknowledgments

- Thanks to the [Vercel](https://vercel.com/) and [Supabase](https://supabase.io/) teams for their amazing services.

Happy loan tracking with Loan Manager! 📊💰
