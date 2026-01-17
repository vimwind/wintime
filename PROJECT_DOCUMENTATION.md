# Beautyeo Salon Website - Project Documentation

## Project Overview

The Beautyeo Salon Website is a modern, luxury-focused beauty salon platform built with React 19, Tailwind CSS 4, and Framer Motion. It features smooth animations, professional design, and a comprehensive booking system inspired by the Webflow Beautyeo template.

## Design Philosophy: Modern Luxury Minimalism

The website embodies a **Modern Luxury Minimalism** aesthetic that prioritizes elegance through restraint. This design philosophy combines high-end beauty industry standards with contemporary web design principles.

### Key Design Principles

1. **Sophisticated Simplicity**: Every element serves a purpose. The design eliminates visual clutter while maintaining visual interest through intentional use of whitespace, typography hierarchy, and carefully curated imagery.

2. **Premium Materiality**: The design employs subtle depth through soft shadows, refined borders, and smooth transitions. Rather than flat design, we use gentle elevation and layering to create a tactile, luxurious feel.

3. **Intentional Motion**: Animations are purposeful and elegant—never gratuitous. Scroll-triggered reveals, smooth page transitions, and micro-interactions enhance the user journey.

4. **Curated Imagery**: High-quality, professionally shot beauty photography is the hero. Images are given breathing room and showcase the artistry of the salon's work.

## Technology Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS 4 with custom theme variables
- **Animations**: Framer Motion for scroll-triggered and interactive animations
- **Routing**: Wouter for client-side navigation
- **UI Components**: shadcn/ui for form elements and UI primitives
- **Icons**: Lucide React
- **Form Validation**: React Hook Form with Zod
- **Notifications**: Sonner for toast notifications

## Color Palette

- **Primary Accent**: Green (`oklch(0.35 0.15 142)`) - Signature brand color
- **Background**: Pure white (`oklch(0.99 0.001 0)`)
- **Foreground**: Deep charcoal (`oklch(0.2 0.02 65)`)
- **Secondary**: Light gray (`oklch(0.95 0.002 0)`)
- **Muted**: Subtle gray (`oklch(0.92 0.002 0)`)

## Typography

- **Display Font**: Playfair Display (serif) - Headlines and prominent text
- **Body Font**: Outfit (sans-serif) - Body text and descriptions
- **Hierarchy**: 
  - H1: 64px, bold, letter-spacing -0.02em
  - H2: 48px, semi-bold
  - H3: 32px, semi-bold
  - Body: 16px, regular, line-height 1.6

## Project Structure

```
salon-website/
├── client/
│   ├── public/
│   │   └── images/          # Generated hero and service images
│   │       ├── hero-main.jpg
│   │       ├── services-hair.jpg
│   │       ├── services-nails.jpg
│   │       ├── services-makeup.jpg
│   │       └── services-body-treatment.jpg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx           # Navigation header with mobile menu
│   │   │   ├── Footer.tsx           # Footer with contact info and links
│   │   │   ├── ScrollReveal.tsx     # Scroll-triggered reveal animations
│   │   │   ├── AnimatedButton.tsx   # Enhanced button with smooth interactions
│   │   │   ├── ParallaxSection.tsx  # Parallax scroll effects
│   │   │   ├── StaggerContainer.tsx # Cascading animations
│   │   │   └── ui/                  # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Homepage with hero and services
│   │   │   ├── Services.tsx         # Detailed services listing
│   │   │   ├── About.tsx            # About salon and team
│   │   │   ├── Blog.tsx             # Beauty tips and articles
│   │   │   ├── Contact.tsx          # Contact form and booking
│   │   │   └── NotFound.tsx         # 404 page
│   │   ├── App.tsx                  # Main app with routing
│   │   ├── index.css                # Global styles and animations
│   │   └── main.tsx                 # React entry point
│   └── index.html
├── server/
│   └── index.ts                     # Express server (static deployment)
├── package.json
└── README.md
```

## Pages

### 1. Home Page (`/`)
- **Hero Section**: Full-screen background image with headline and CTAs
- **Services Overview**: Grid of 4 featured services with images
- **CTA Section**: Call-to-action for booking appointments
- **Blog Preview**: 3 latest blog posts
- **Newsletter Signup**: Email subscription form

**Features**:
- Smooth fade-in animations on scroll
- Responsive hero section
- Staggered service card animations
- Professional imagery

### 2. Services Page (`/services`)
- **Page Header**: Introductory section
- **Services Grid**: All 6 services with detailed information
  - Hair Styling & Coloring
  - Nail Care & Styling
  - Professional Makeup
  - Facial Treatments
  - Body Treatments
  - Aesthetic Medicine
- **Why Choose Us**: 3 value propositions
- **CTA Section**: Booking encouragement

**Features**:
- Detailed service descriptions
- Pricing information
- Duration estimates
- Service inclusions list
- Individual booking CTAs

### 3. About Page (`/about`)
- **Page Header**: Introduction
- **Our Story**: Narrative about the salon's founding and mission
- **Core Values**: 4 key values with icons
- **Team Section**: 4 team member profiles with photos
- **Stats Section**: Key metrics (years of experience, happy clients, etc.)

**Features**:
- Team member showcase
- Value proposition cards
- Compelling brand narrative
- Professional photography

### 4. Blog Page (`/blog`)
- **Page Header**: Introduction
- **Featured Post**: Large featured article with metadata
- **Blog Grid**: 5 additional articles in a 3-column grid
- **Newsletter CTA**: Subscription encouragement

**Features**:
- Article metadata (date, author, read time)
- Featured post highlighting
- Responsive grid layout
- Article preview cards

### 5. Contact Page (`/contact`)
- **Page Header**: Introduction
- **Contact Info Cards**: 4 contact methods
- **Booking Form**: Comprehensive appointment booking form
  - Name, email, phone fields
  - Service selection dropdown
  - Date and time pickers
  - Additional notes textarea
  - Form validation and submission feedback
- **Map Section**: Location display placeholder

**Features**:
- Professional form design
- Real-time validation
- Success/error notifications
- Accessible form inputs
- Mobile-responsive layout

## Components

### ScrollReveal
Scroll-triggered animations that fade in and slide elements into view as they enter the viewport.

```tsx
<ScrollReveal delay={0.1} direction="up">
  <div>Content that animates on scroll</div>
</ScrollReveal>
```

### AnimatedButton
Enhanced button component with smooth hover and tap animations.

```tsx
<AnimatedButton variant="primary" size="md">
  Book Now
</AnimatedButton>
```

### ParallaxSection
Creates parallax scroll effects for immersive sections.

```tsx
<ParallaxSection offset={50}>
  <img src="..." alt="..." />
</ParallaxSection>
```

### StaggerContainer
Cascading animation container for multiple child elements.

```tsx
<StaggerContainer staggerDelay={0.1}>
  {items.map(item => <div key={item.id}>{item}</div>)}
</StaggerContainer>
```

## Animation Strategy

### Entrance Animations
- Elements fade in with upward motion (50-100px) over 600-800ms when scrolled into view
- Stagger delays create cascading effect
- Implemented via ScrollReveal component

### Hover Animations
- Buttons and cards respond with subtle scale changes (1.02-1.05x)
- Color shifts are smooth with 200-300ms transitions
- Implemented via Framer Motion whileHover

### Page Transitions
- Content fades smoothly (200-300ms) between pages
- Creates cohesive, app-like experience
- Handled by Wouter routing

### Micro-interactions
- Form field focus states with color and ring animations
- Button press feedback with scale down (0.98x)
- Hover states on all interactive elements

## Booking Form Features

The Contact page includes a modern, professional booking form with:

- **Form Fields**:
  - Full Name (required)
  - Email Address (required)
  - Phone Number (optional)
  - Service Selection (required, dropdown)
  - Preferred Date (required, date picker)
  - Preferred Time (optional, time picker)
  - Additional Notes (optional, textarea)

- **Validation**:
  - Required field validation
  - Email format validation
  - Real-time feedback

- **User Experience**:
  - Loading state with spinner
  - Success notification
  - Error handling
  - Form reset after submission
  - Accessible form labels and inputs

## Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: Default (< 640px)
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px+

All pages and components adapt seamlessly across devices with:
- Flexible grid layouts
- Responsive typography
- Mobile-optimized navigation
- Touch-friendly buttons and forms

## Performance Optimizations

1. **Image Optimization**: High-quality generated images with proper sizing
2. **Code Splitting**: Pages loaded on-demand via Wouter routing
3. **CSS-in-JS**: Tailwind CSS for minimal CSS payload
4. **Animation Performance**: Framer Motion uses GPU acceleration
5. **Lazy Loading**: Images load as needed

## Accessibility

- Semantic HTML structure
- ARIA labels for form inputs
- Keyboard navigation support
- Focus indicators on interactive elements
- Color contrast compliance
- Alt text for all images

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Workflow

### Local Development
```bash
cd /home/ubuntu/salon-website
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Type Checking
```bash
pnpm check
```

### Code Formatting
```bash
pnpm format
```

## Deployment

The website is deployed on Manus with automatic CI/CD. To publish:

1. Create a checkpoint via the Management UI
2. Click the "Publish" button in the header
3. Website is live at the assigned domain

## Future Enhancements

1. **Backend Integration**: Add database for blog posts and bookings
2. **Authentication**: User accounts for booking history
3. **Payment Processing**: Stripe integration for deposits
4. **Email Notifications**: Booking confirmations and reminders
5. **Admin Dashboard**: Manage bookings, staff, and content
6. **Analytics**: Track user behavior and conversion metrics
7. **SEO Optimization**: Meta tags, structured data, sitemap
8. **Multi-language Support**: Internationalization (i18n)

## Customization Guide

### Changing Colors
Edit the CSS variables in `client/src/index.css`:
```css
--primary: oklch(0.35 0.15 142); /* Change primary color */
--background: oklch(0.99 0.001 0); /* Change background */
```

### Updating Content
- **Services**: Edit `client/src/pages/Services.tsx`
- **Team**: Edit `client/src/pages/About.tsx`
- **Blog**: Edit `client/src/pages/Blog.tsx`
- **Contact Info**: Edit `client/src/components/Footer.tsx`

### Adding New Pages
1. Create new page component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Add navigation link in `client/src/components/Header.tsx`

## Support & Maintenance

For issues or questions:
1. Check the component documentation in this file
2. Review the code comments in component files
3. Consult the Tailwind CSS and Framer Motion documentation
4. Contact the development team

---

**Last Updated**: January 17, 2026
**Version**: 1.0.0
**Status**: Production Ready
