# Daily Standup Website

A modern, responsive web application for teams to conduct daily standup meetings. Built with Next.js and Tailwind CSS, this application allows developers to report their daily progress, track accomplishments, and identify blockers.

## Features

- **Daily Standup Form**: Submit what you accomplished yesterday, what you're working on today, and any blockers
- **Real-time Updates**: See team updates as they come in
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: Data persists in the browser (no backend required)
- **Clean UI**: Modern, intuitive interface with Tailwind CSS
- **Team Statistics**: Quick overview of today's participation and blockers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Management

- **View database**: `npm run db:studio` - Opens Prisma Studio in your browser
- **Generate client**: `npm run db:generate` - Regenerates Prisma client after schema changes
- **Run migrations**: `npm run db:migrate` - Applies database schema changes

## Usage

### Submitting a Standup

1. Fill out the form with your name
2. Describe what you accomplished yesterday
3. Explain what you're working on today
4. Add any blockers or impediments (optional)
5. Click "Submit Standup"

### Viewing Team Updates

- All team updates are displayed in chronological order
- Updates are grouped by date for easy reading
- Each entry shows the developer's name, submission time, and detailed responses

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Build your project:
```bash
npm run build
```

2. Go to [Netlify](https://netlify.com) and sign up/login
3. Click "New site from Git" or "Add new site"
4. Connect your GitHub/GitLab/Bitbucket repository
5. Set build command: `npm run build`
6. Set publish directory: `.next`
7. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build your project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=.next
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"
```

For production, use a proper database URL:
```env
# PostgreSQL example
DATABASE_URL="postgresql://username:password@localhost:5432/standup_db"

# Or SQLite for simple deployments
DATABASE_URL="file:./prod.db"
```

## Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── standups/            # API routes for standup operations
│   ├── components/
│   │   ├── StandupForm.tsx      # Form for submitting standups
│   │   └── StandupList.tsx      # Display list of standups
│   ├── lib/
│   │   └── prisma.ts            # Prisma client configuration
│   ├── types/
│   │   └── standup.ts           # TypeScript interfaces
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page component
├── prisma/
│   ├── migrations/              # Database migrations
│   └── schema.prisma            # Database schema
├── netlify.toml                 # Netlify configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Technologies Used

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Prisma**: Database ORM and query builder
- **SQLite**: Lightweight database (development)
- **PostgreSQL**: Production database option

## Customization

### Adding New Fields

To add new fields to the standup form:

1. Update the `StandupEntry` interface in `app/types/standup.ts`
2. Add form fields in `app/components/StandupForm.tsx`
3. Update the display logic in `app/components/StandupList.tsx`

### Styling

The application uses Tailwind CSS. You can customize colors, spacing, and other design elements by modifying the Tailwind classes in the component files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please open an issue in the GitHub repository.
