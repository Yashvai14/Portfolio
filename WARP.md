# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Next.js 15** portfolio website for Yash Deepak Vaidya, a Full Stack Developer. The project showcases a modern, animated personal portfolio built with cutting-edge React technologies.

### Tech Stack
- **Framework**: Next.js 15.4.7 with React 19.1.0
- **Styling**: Tailwind CSS 3.4.17 with custom gradient themes
- **Animations**: Framer Motion 12.23.12 for complex animations and page transitions
- **Icons**: Lucide React and React Icons
- **Typography**: Poppins font from Google Fonts
- **Development**: TypeScript 5.x with strict type checking

## Architecture

### App Router Structure
The project uses Next.js 15's App Router with the following structure:

- **`app/layout.tsx`**: Root layout defining global metadata, font configuration (Poppins), and HTML structure
- **`app/page.tsx`**: Main page that orchestrates all portfolio sections in sequence
- **`app/globals.css`**: Global styles including dark navy gradient background, custom scrollbar, and glass-morphism utilities

### Component Architecture
All UI components are located in the `components/` directory as client-side components:

- **`navbar.tsx`**: Auto-hiding navigation with smooth scroll detection and animated underlines
- **`hero.tsx`**: Landing section featuring typewriter effect, animated background blobs, and social links
- **`about.tsx`**: Personal introduction with staggered text animations
- **`skill.tsx`**: Interactive skill bars with percentage animations, technology badges, and "Currently Learning" section
- **`project.tsx`**: Infinite scrolling project carousel with hover interactions
- **`contact.tsx`**: Contact form with animated inputs and social media links

### Design System

**Color Palette**: Dark navy gradient theme (`#0a0f1c` → `#0f1e33` → `#1a2a4f`) with blue and purple accent colors

**Animation Patterns**: Consistent use of Framer Motion for:
- Page entry animations with staggered timing
- Floating background blob animations
- Interactive hover states with scale transforms
- Scroll-triggered animations with `whileInView`

**Glass Morphism**: Extensive use of `backdrop-blur`, `bg-white/10`, and gradient borders for modern UI

## Development Commands

### Core Development
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Key Development Notes

- **Development server runs on**: `http://localhost:3000`
- **Turbopack enabled**: Development server uses `--turbopack` flag for faster builds
- **TypeScript paths**: `@/*` alias configured to reference project root
- **ESLint**: Configured with Next.js core web vitals and TypeScript support

## Component Patterns

### Animation Conventions
Components consistently use these Framer Motion patterns:
- `initial/animate/exit` for component mounting
- `whileInView` with `viewport={{ once: true }}` for scroll animations  
- `staggerChildren` for sequential animations
- Custom `variants` objects for reusable animation definitions

### Responsive Design
- Fixed width layouts (1200px containers) optimized for desktop viewing
- Mobile responsiveness handled through Tailwind's responsive utilities
- Components designed for hover interactions (desktop-focused portfolio)

### State Management
- Minimal local state using React hooks
- Navigation scroll behavior tracked in navbar component
- Hover states managed for interactive project carousel

## Styling Approach

### Custom CSS Classes
Key utility classes defined in `globals.css`:
- `.bg-dark-navy`: Solid gradient backgrounds
- `.bg-dark-navy-glass`: Glass morphism effects with backdrop blur
- Poppins font family applied globally with weight variations (400, 500, 600, 700)

### Tailwind Configuration
- Extended font family configuration for Poppins
- Content paths configured for app/, pages/, and components/ directories
- No additional plugins - leverages core Tailwind utilities

This portfolio demonstrates advanced React patterns, modern CSS techniques, and sophisticated animation choreography suitable for a senior-level developer showcase.
