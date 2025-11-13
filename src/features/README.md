# Features Directory

This directory contains the feature-based organization of the Achiever Perks Hub codebase. Each feature is self-contained with its own components, pages, forms, and related logic.

## Structure

```
src/features/
├── auth/                    # Authentication & user management
│   ├── components/         # Auth-specific reusable components
│   ├── pages/             # Login, Signup, Profile pages
│   └── index.ts           # Barrel exports
├── edu-revolution/         # EduRev module - achievement claims & benefits
│   ├── components/        # EduRev-specific reusable components
│   ├── forms/            # All EduRev application forms
│   ├── pages/            # EduRev main pages
│   └── index.ts          # Barrel exports
├── beyond-academics/       # Flexible department programs
│   ├── components/        # Beyond academics reusable components
│   ├── pages/            # Program listings, applications, etc.
│   └── index.ts          # Barrel exports
├── dashboard/             # User dashboard and analytics
│   ├── components/       # Dashboard widgets and components
│   └── index.ts          # Barrel exports
└── projects/             # Project management & mentorship
    ├── components/       # Project-related components
    ├── pages/           # Project listings, management pages
    └── index.ts         # Barrel exports
```

## Design Principles

### Feature Isolation
- Each feature folder contains all code related to that specific domain
- Features should be as self-contained as possible
- Cross-feature dependencies should be minimal and explicit

### Consistent Structure
Each feature follows this pattern:
- `components/` - Reusable UI components specific to the feature
- `pages/` - Top-level page components for routing
- `forms/` - Form components (where applicable)
- `hooks/` - Feature-specific custom hooks (when needed)
- `types/` - Feature-specific TypeScript types (when needed)
- `index.ts` - Barrel exports for clean imports

### Import Guidelines
- Import from feature barrel exports: `import { Component } from '@/features/feature-name'`
- Import shared utilities: `import { utility } from '@/shared'`
- Import UI components: `import { Button } from '@/components/ui/button'`

## Adding New Features

1. Create a new folder under `/features/`
2. Follow the established structure pattern
3. Create an `index.ts` file with barrel exports
4. Add documentation README if complex
5. Update routing in `App.tsx`

## Best Practices

- Keep features focused and cohesive
- Use shared components from `@/shared/components` for common UI
- Extract feature-specific constants to feature-level constants file
- Use TypeScript interfaces from `@/shared/types` or create feature-specific types
- Follow the existing naming conventions