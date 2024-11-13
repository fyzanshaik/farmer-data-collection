# Farming Production Management System

## 1. System Overview
The system is designed to manage and track organic farming production data, primarily focusing on data collection from farmers and their fields. It includes a secure authentication system, data management interface, and location tracking capabilities.

## 2. Technical Architecture

### 2.1 Technology Stack
#### Frontend
- **Core**: React + Vite + TypeScript
- **UI Components**: shadcn/ui + Framer Motion
- **Styling**: Tailwind CSS
- **State Management**: Zustand (recommended over Redux for this scale)
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form + Zod
- **Routing**: React Router

#### Backend
- **Runtime**: Node.js + Express
- **Database**: PostgreSQL (Primary) + Redis (Caching)
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: AWS S3/Digital Ocean Spaces
- **Maps Integration**: Google Maps API

### 2.2 Database Choice Rationale
Choosing PostgreSQL over MongoDB because: 
- Strong data relationships (farmer -> fields -> documents)
- Complex querying requirements
- ACID compliance for financial data
- Better handling of structured data
- Built-in GIS support for geolocation data

## 3. Project Structure

```
farming-production/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # shadcn components
│   │   │   ├── forms/     # Form components
│   │   │   └── maps/      # Map related components
│   │   ├── features/      # Feature-based components
│   │   │   ├── auth/
│   │   │   ├── farmers/
│   │   │   └── fields/
│   │   ├── layouts/       # Layout components
│   │   ├── lib/          # Utilities and helpers
│   │   ├── stores/       # Zustand stores
│   │   ├── api/          # API integration
│   │   └── types/        # TypeScript types
│   └── public/
└── server/                # Backend application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Custom middleware
    │   ├── models/       # Prisma models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── utils/        # Utility functions
    └── prisma/
        └── schema.prisma # Database schema
```

## 4. Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(STAFF)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Farmer {
  id            String   @id @default(cuid())
  name          String
  photoUrl      String?
  relationInfo  String   // S/O, W/O, D/O
  gender       Gender
  community    String
  aadharNumber String   @unique
  state        String
  district     String
  mandal       String
  village      String
  panchayath   String
  dateOfBirth  DateTime
  age          Int
  contact      String
  bankDetails  BankDetails?
  fields       Field[]
  documents    Document[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model BankDetails {
  id            String @id @default(cuid())
  accountNumber String
  ifscCode      String
  bankName      String
  farmer        Farmer @relation(fields: [farmerId], references: [id])
  farmerId      String @unique
}

model Field {
  id           String    @id @default(cuid())
  geoLocation  Json      // Stores lat/lng or polygon data
  surveyNumber String
  areaInHa     Float
  yieldEstimate Float
  farmer       Farmer    @relation(fields: [farmerId], references: [id])
  farmerId     String
}

model Document {
  id        String     @id @default(cuid())
  type      DocumentType
  fileUrl   String
  farmer    Farmer     @relation(fields: [farmerId], references: [id])
  farmerId  String
}

enum Role {
  ADMIN
  STAFF
}

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum DocumentType {
  AADHAR
  BANK_STATEMENT
  LAND_DOCUMENT
}
```

## 5. Authentication Flow
1. User registration (admin only)
2. JWT-based authentication
3. Role-based access control
4. Refresh token rotation

## 6. API Endpoints Structure

```
/api/v1
├── /auth
│   ├── POST /login
│   ├── POST /logout
│   └── POST /refresh-token
├── /farmers
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   ├── PUT /:id
│   └── DELETE /:id
├── /fields
│   ├── GET /
│   ├── GET /:id
│   ├── POST /
│   └── PUT /:id
└── /documents
    ├── POST /upload
    └── GET /:id
```

## 7. Frontend Routes

```
/
├── /login
├── /dashboard
├── /farmers
│   ├── /
│   ├── /new
│   └── /:id
├── /fields
│   ├── /
│   └── /:id
└── /reports
```

## Add this after initialization prisma client: 
Inside the .env file : 
```
DATABASE_URL="postgresql://"
PORT = "8080"
REDIS_URL = ""
JWT_SECRET = ""
JWT_EXPIRES_IN =""
AWS_ACCESS_KEY_ID = ""
AWS_SECRET_ACCESS_KEY = ""
AWS_REGION = ""
AWS_BUCKET_NAME = ""
```


## 8. Implementation Steps

1. **Phase 1: Project Setup**
   - Initialize frontend and backend projects
   - Set up database and ORM
   - Configure authentication system

2. **Phase 2: Core Features**
   - Implement farmer registration form
   - Develop field management system
   - Create document upload system

3. **Phase 3: Integration**
   - Integrate Google Maps
   - Implement search and filtering
   - Add data export features

4. **Phase 4: Enhancement**
   - Add caching layer
   - Implement analytics
   - Add batch operations

## 9. Security Considerations

1. Input validation using Zod
2. JWT token security
3. File upload validation
4. Rate limiting
5. SQL injection prevention
6. XSS protection
7. CORS configuration