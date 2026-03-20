# Munch - Food Review App

## Project Overview

Munch is a food review platform designed to help users discover, rate, and review individual food items from venues. Similar to UberEats, the app displays items linked to specific venues with individual item ratings that aggregate to form overall venue ratings.

**Key Features:**
- View reviews without requiring an account
- User authentication for rating and reviewing
- Individual item ratings that aggregate to venue ratings
- Modern, inviting user interface
- Cross-platform support (Web first, iOS and Android planned)

---

## Technology Stack

### Frontend
- **Framework**: Next.js (via `bunx`)
- **Package Manager**: Bun
- **UI Library**: Shadcn UI
- **Styling**: Tailwind CSS (shadcn dependency)
- **State Management**: TBD (React Context or external library)
- **HTTP Client**: Fetch API or Axios

### Backend
- **Framework**: Django (5.2)
- **API**: Django REST Framework (DRF)
- **Authentication**: JWT (Simple JWT)
- **Database**: PostgreSQL
- **Admin Dashboard**: Django Admin
- **CORS**: django-cors-headers

---

## Frontend Setup

### Technology Requirements
- Node.js/Bun environment
- Next.js application bootstrapped with `bunx create-next-app`
- Shadcn UI components imported and configured via Bun

### Installation Command
```bash
bunx create-next-app@latest munch-frontend
```

### Shadcn UI Integration
```bash
cd munch-frontend
bunx shadcn-ui@latest init
```

### Component Libraries to Import
- Buttons
- Cards
- Input fields
- Select dropdowns
- Modal dialogs
- Rating/Star components
- Image carousels
- Navigation components
- Search/filter components

---

## Design System

### Color Palette

#### Primary (Appetite Stimulation)
- **Red**: `#FF4444` - Action buttons, highlights, urgent elements
- **Orange**: `#FF8C42` - Call-to-action, secondary buttons, hovers
- **Yellow**: `#FFD93D` - Accents, badges, highlights

#### Secondary (Trust & Health)
- **Blue**: `#4A90E2` - Links, trust indicators, secondary actions
- **Green**: `#27AE60` - Health badges, verified markers, fresh indicators

#### Neutrals
- **Dark**: `#1A1A1A` - Text, dark mode backgrounds
- **Light**: `#FFFFFF` - Main background
- **Gray**: `#E0E0E0` - Borders, disabled states

### Typography
- **Headings**: Bold, large (24px+) to draw attention
- **Body**: Clean, readable (14-16px)
- **Status text**: Smaller accents with color coding

### Spacing & Layout
- Modern card-based layout
- Generous whitespace
- Mobile-first responsive design
- Touch-friendly buttons (minimum 44x44px)

---

## Backend Implementation

### Core Models
- **User**: Authentication, profiles, preferences
- **Venue**: Restaurant/food venues with hours, location, rating, associated campus
- **Item**: Individual menu items linked to venues
- **Review**: User reviews for items and venues
- **Rating**: Numerical ratings tied to items and venues

### API Endpoints (Django DRF)

#### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - JWT token generation
- `POST /api/auth/refresh/` - Refresh JWT token
- `POST /api/auth/logout/` - Invalidate token

#### Venues
- `GET /api/venues/` - List all venues (public, paginated, filterable by campus)
- `GET /api/venues/?campus=<campus_id>` - List venues by campus
- `GET /api/venues/<id>/` - Venue details with items
- `POST /api/venues/` - Create venue (authenticated, admin)
- `PUT /api/venues/<id>/` - Update venue (admin)

#### Items
- `GET /api/venues/<venue_id>/items/` - List items by venue (public)
- `GET /api/items/<id>/` - Item details with reviews (public)
- `POST /api/items/` - Create item (admin)
- `PUT /api/items/<id>/` - Update item (admin)

#### Reviews & Ratings
- `GET /api/items/<item_id>/reviews/` - List reviews for item (public)
- `POST /api/reviews/` - Create review (authenticated)
- `PUT /api/reviews/<id>/` - Update review (authenticated, owner)
- `DELETE /api/reviews/<id>/` - Delete review (authenticated, owner)
- `GET /api/venues/<venue_id>/rating/` - Get aggregated venue rating (public)

### Serializers Structure
```python
# Serializers in api/serializers.py
- UserSerializer
- VenueSerializer (with nested items)
- ItemSerializer (with nested reviews)
- ReviewSerializer (with user info)
- RatingSerializer (aggregated data)
```

### Django Admin Configuration
- User management dashboard
- Venue administration
- Item management
- Review moderation
- Rating analytics

### Authentication Details
- JWT Access Token Lifetime: 30 minutes
- JWT Refresh Token Lifetime: 1 day
- Token storage: HttpOnly cookies (frontend handles)
- CORS enabled for frontend domain

---

## Frontend Pages & Views

### Public Pages (No Authentication Required)
- Home/Landing page
  - Featured venues
  - Popular items
  - Search bar
  - Browse by category

- Venue Detail page
  - Venue information, hours, location, campus
  - Item list with ratings
  - Average venue rating
  - Public reviews

- Item Detail page
  - Item image/carousel
  - Item rating and statistics
  - Individual reviews
  - Related items

- Browse/Search page
  - Filter by cuisine, rating, distance, campus
  - Sorting options
  - Pagination

### Authenticated Pages (Login Required)
- User Dashboard
  - My reviews
  - Saved favorites
  - Profile settings

- Review Creation page
  - Star rating (1-5)
  - Text review
  - Image upload
  - Venue/Item selector

- User Profile page
  - Review history
  - Preferences
  - Account settings

---

## Frontend-Backend Integration

### API Configuration
- Base URL from environment variables (`.env.local`)
- Axios/Fetch interceptors for JWT token injection
- Error handling and user feedback
- Loading states and skeleton screens

### Authentication Flow
1. User signs up/logs in
2. Backend returns JWT tokens (access + refresh)
3. Frontend stores tokens securely
4. Include Authorization header in requests
5. Handle token expiry with refresh logic
6. Logout clears tokens

### State Management
- User authentication state
- Current reviews/ratings
- Favorites/saved items
- Filter and sort preferences
- Loading and error states

---

## Environment Variables

### Backend (`.env`)
```
DEBUG=false
SECRET_KEY=<secure-key>
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
DB_ENGINE=django.db.backends.postgresql
DB_NAME=munch_db
DB_USER=postgres
DB_PASSWORD=<password>
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOW_ALL_ORIGINS=true (for development)
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Frontend (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Munch
```

---

## Development Workflow

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
bunx create-next-app@latest munch-frontend
cd munch-frontend
bunx add shadcn-ui
bunx dev
```

### Running Together
- Backend: `python manage.py runserver` (http://localhost:8000)
- Frontend: `bunx dev` (http://localhost:3000)
- Django Admin: http://localhost:8000/admin

---

## Deployment Considerations

### Backend
- PostgreSQL production database
- Gunicorn + Nginx for production
- Static files handling
- Environment-based configuration
- HTTPS/SSL certificates

### Frontend
- Next.js production build
- Vercel or similar platform for hosting
- Environment variables per deployment
- CDN for static assets
- SEO optimization

### Mobile Apps (Future)
- React Native or Flutter
- Same backend API
- Native UI considerations
- App store deployment

---

## Success Metrics

- ✅ Users can browse venues and items without login
- ✅ JWT-protected review creation and management
- ✅ Item ratings aggregate to venue ratings
- ✅ Modern, appealing food app UI with vibrant colors
- ✅ Fast, responsive Next.js frontend
- ✅ Secure, scalable Django backend
- ✅ Ready for iOS/Android app connection

---

## Next Steps

1. [ ] Finalize backend models and migrations
2. [ ] Implement DRF serializers and API endpoints
3. [ ] Configure Django admin for content management
4. [ ] Bootstrap Next.js frontend with Bun
5. [ ] Integrate Shadcn UI components
6. [ ] Implement color scheme and design system
7. [ ] Build public pages (venue, item, home)
8. [ ] Implement authentication flow
9. [ ] Build authenticated pages (review creation, profile)
10. [ ] Connect frontend to backend API
11. [ ] Deploy to production
12. [ ] Plan iOS/Android app development
