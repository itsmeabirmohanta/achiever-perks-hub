# Shared Directory

This directory contains all shared utilities, components, constants, types, and helper functions that are used across multiple features in the Achiever Perks Hub application.

## Structure

```text
src/shared/
├── components/           # Shared React components
│   └── Header.tsx       # Navigation header component
├── constants/           # Application-wide constants
│   ├── app.ts          # General app constants (file constraints, roles, etc.)
│   └── routes.ts       # Route definitions and API endpoints
├── types/              # Shared TypeScript type definitions
│   └── index.ts        # Common interfaces and types
├── utils/              # Utility functions and helpers
│   └── index.ts        # File handling, validation, formatting utilities
└── index.ts            # Barrel exports for all shared modules
```

## Purpose

The shared directory serves as the foundation for consistent behavior and styling across all features. It prevents code duplication and ensures consistency in:

- **UI Components**: Common layout components like headers, footers
- **Constants**: File size limits, API endpoints, form options
- **Types**: Data structures used across features
- **Utilities**: Common helper functions for validation, formatting, etc.

## Usage Guidelines

### Importing Shared Resources

```typescript
// Import everything from shared barrel export
import { ROUTES, validateFileSize, User, Header } from '@/shared';

// Import specific modules
import { ROUTES } from '@/shared/constants/routes';
import { validateFileSize } from '@/shared/utils';
import type { User } from '@/shared/types';
```

### When to Add to Shared

Add code to shared when:

- Used by 2+ features
- Represents a core business rule or constraint
- Provides utility that should be consistent across the app
- Defines common data structures

### What Goes Where

#### Constants (`/constants/`)
- API endpoints and routes
- File upload constraints
- Form field options (roles, assessment types, etc.)
- Environment-specific values

#### Types (`/types/`)
- Core data models (User, Achievement, Course)
- Form data structures
- API response/request types
- Shared interface definitions

#### Utils (`/utils/`)
- File validation and formatting
- Date/time formatting
- String manipulation helpers
- Form data creation utilities
- Status and state helpers

#### Components (`/components/`)
- Navigation components (Header, Footer)
- Common layout components
- Reusable UI patterns used across features

## Best Practices

1. **Single Responsibility**: Each file should have a focused purpose
2. **Type Safety**: Export proper TypeScript types
3. **Documentation**: Add JSDoc comments for complex utilities
4. **Consistency**: Follow established naming conventions
5. **Testing**: Shared utilities should be unit tested
6. **Minimal Dependencies**: Shared code should avoid feature-specific logic

## Maintenance

- Review shared code regularly for unused exports
- Refactor when patterns emerge across features
- Keep utilities pure and side-effect free
- Update types when data models change
- Ensure backward compatibility when making changes