# Technology Stack

## Backend (Django)
- **Framework**: Django 4.2.10 with Django REST Framework 3.14.0
- **Database**: SQLite3 (development)
- **Authentication**: Token-based authentication via DRF
- **CORS**: django-cors-headers for frontend integration
- **Python Version**: 3.8+

## Frontend Applications

### Customer Frontend (turf-main)
- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.0
- **UI Library**: Material-UI (MUI) 7.2.0
- **HTTP Client**: Axios 1.10.0
- **Routing**: React Router DOM 7.6.3
- **Animations**: Framer Motion 12.23.0
- **Date Handling**: date-fns 4.1.0
- **Notifications**: Notistack 3.0.2
- **Node Version**: >=18

### Admin Frontend (turf-admin)
- **Framework**: React 19.1.0 with JavaScript
- **Build Tool**: Vite 7.0.4
- **UI Library**: Material-UI (MUI) 7.2.0
- **HTTP Client**: Axios 1.10.0
- **Routing**: React Router DOM 7.7.0
- **Date Handling**: date-fns 4.1.0

## Common Commands

### Backend (Django)
```bash
# Setup
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Database
python manage.py migrate
python manage.py createsuperuser
python manage.py loaddata initial_data.json

# Development
python manage.py runserver
python manage.py test
```

### Frontend Development
```bash
# Customer Frontend (turf-main)
cd turf-main
npm install
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint

# Admin Frontend (turf-admin)
cd turf-admin
npm install
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
```

## Development Environment
- **OS**: Windows with cmd shell
- **Package Managers**: pip (Python), npm (Node.js)
- **Code Style**: ESLint for JavaScript/TypeScript
- **API Documentation**: Endpoints documented in README.md