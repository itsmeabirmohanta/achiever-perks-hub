# Codebase Organization

This document explains the new organized structure of the Achiever Perks Hub codebase.

## 🏗️ Architecture Overview

The codebase has been restructured from a type-based organization to a **feature-based architecture** for better maintainability, scalability, and developer experience.

### Before (Type-based)
```
src/
├── components/
├── pages/
│   └── forms/          # All forms mixed together
├── hooks/
└── lib/
```

### After (Feature-based)
```
src/
├── features/           # Feature-based organization
│   ├── auth/          # Authentication & user management
│   ├── edu-revolution/    # EduRev module
│   ├── beyond-academics/  # Flexible programs
│   ├── dashboard/         # User dashboard
│   └── projects/         # Projects & mentorship
├── shared/            # Shared utilities and components
│   ├── components/    # Common UI components
│   ├── constants/     # App-wide constants
│   ├── types/         # Shared TypeScript types
│   └── utils/         # Helper functions
├── components/ui/     # shadcn/ui components (unchanged)
├── integrations/      # External integrations (unchanged)
└── pages/            # Remaining miscellaneous pages
```

## 🎯 Key Benefits

1. **Feature Isolation**: Each feature is self-contained with related logic grouped together
2. **Scalability**: Easy to add new features without affecting existing code
3. **Maintainability**: Clear separation of concerns and reduced coupling
4. **Developer Experience**: Easier navigation and understanding of code structure
5. **Code Reusability**: Shared utilities and constants prevent duplication

## 📁 Detailed Structure

### `/features/` - Feature-based Modules

#### `auth/`
- Login and signup functionality
- User authentication components
- Auth-related forms and validation

#### `edu-revolution/`
- Achievement submission forms (RPL, MOOC, Projects, etc.)
- EduRev main pages and course listings
- All EduRev-specific logic and components

#### `beyond-academics/`
- Flexible program applications
- Beyond academics achievement tracking
- Leaderboard functionality

#### `dashboard/`
- Main user dashboard
- Analytics and stats components
- Progress tracking

#### `projects/`
- Project listings and management
- Mentorship functionality
- Project application workflows

### `/shared/` - Common Resources

#### `constants/`
- `app.ts` - File constraints, roles, business models, etc.
- `routes.ts` - Application routes and API endpoints

#### `types/`
- `index.ts` - Shared TypeScript interfaces and types
- Common data models (User, Achievement, Course, etc.)

#### `utils/`
- `index.ts` - Utility functions for validation, formatting, etc.
- File handling helpers
- Date/time utilities
- Status helpers

#### `components/`
- Shared UI components like Header
- Common layout components

## 🔧 Usage Guidelines

### Importing from Features
```typescript
// Import from feature barrel exports
import { EduRevolutionPage, RPLForm } from '@/features/edu-revolution';
import { DashboardPage } from '@/features/dashboard';
import { LoginPage } from '@/features/auth';
```

### Importing Shared Resources
```typescript
// Import shared utilities and constants
import { ROUTES, validateFileSize, User } from '@/shared';

// Or import specific modules
import { ROUTES } from '@/shared/constants/routes';
import { validateFileSize } from '@/shared/utils';
import type { User } from '@/shared/types';
```

### Adding New Features

1. Create a folder under `/features/`
2. Follow the established structure (components/, pages/, etc.)
3. Create `index.ts` with barrel exports
4. Update routing in `App.tsx`
5. Add feature documentation if complex

## 🛠️ Migration Status

### ✅ Completed
- [x] Created feature-based folder structure
- [x] Moved all EduRev forms to `features/edu-revolution/forms/`
- [x] Reorganized pages into appropriate features
- [x] Created shared constants and utilities
- [x] Added barrel exports for clean imports
- [x] Updated import paths throughout codebase
- [x] Created comprehensive documentation

### 🔄 Ongoing
- Some import paths may still need adjustment
- Integration testing of moved components
- Potential optimization of shared utilities

## 📋 Best Practices

1. **Feature Isolation**: Keep features self-contained
2. **Shared Resources**: Use shared utilities for common functionality
3. **Consistent Structure**: Follow the established patterns
4. **Clean Imports**: Use barrel exports for cleaner import statements
5. **Type Safety**: Leverage shared TypeScript types
6. **Documentation**: Keep feature documentation updated

This organization provides a solid foundation for scaling the Achiever Perks Hub application while maintaining code quality and developer productivity.