import { Link } from 'wouter';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Clock, Users, Award } from 'lucide-react';

/**
 * Services Page - Detailed service listings with imagery and descriptions
 * Design: Asymmetric layout with varied card sizes, premium imagery,
 * and detailed service information with booking CTAs.
 */

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Hair Styling & Coloring',
      description: 'From trendy cuts to vibrant colors, our skilled stylists will transform your hair with precision and creativity.',
      details: [
        'Professional haircuts and styling',
        'Hair coloring and highlights',
        'Keratin treatments',
        'Hair extensions',
        'Blow-dry services',
      ],
      price: 'Starting from $60',
      duration: '1-3 hours',
      image: '/images/services-hair.jpg',
    },
    {
      id: 2,
      title: 'Nail Care & Styling',
      description: 'Pamper yourself with our luxurious manicure and pedicure services using premium products.',
      details: [
        'Gel manicures & pedicures',
        'Acrylic nails',
        'Nail art designs',
        'Shellac polish',
        'Nail extensions',
      ],
      price: 'Starting from $40',
      duration: '45 min - 1.5 hours',
      image: '/images/services-nails.jpg',
    },
    {
      id: 3,
      title: 'Professional Makeup',
      description: 'Enhance your natural beauty with our professional makeup services for any occasion.',
      details: [
        'Bridal makeup',
        'Event makeup',
        'Makeup lessons',
        'Makeup touch-ups',
        'Special occasion makeup',
      ],
      price: 'Starting from $75',
      duration: '1-2 hours',
      image: '/images/services-makeup.jpg',
    },
    {
      id: 4,
      title: 'Facial Treatments',
      description: 'Experience rejuvenating facial treatments for a radiant and youthful glow.',
      details: [
        'Hydrating facials',
        'Anti-aging treatments',
        'Acne facials',
        'Chemical peels',
        'Microdermabrasion',
      ],
      price: 'Starting from $85',
      duration: '1 hour',
      image: '/images/hero-main.jpg',
    },
    {
      id: 5,
      title: 'Body Treatments',
      description: 'Indulge in our pampering body treatments to nourish and rejuvenate your skin.',
      details: [
        'Body scrubs',
        'Body wraps',
        'Massage therapy',
        'Waxing services',
        'Body moisturizing treatments',
      ],
      price: 'Starting from $95',
      duration: '1-1.5 hours',
      image: '/images/services-body-treatment.jpg',
    },
    {
      id: 6,
      title: 'Aesthetic Medicine',
      description: 'Experience the latest in non-surgical cosmetic procedures with our expert practitioners.',
      details: [
        'Botox treatments',
        'Dermal fillers',
        'Microneedling',
        'Laser treatments',
        'Skin tightening',
      ],
      price: 'Starting from $150',
      duration: 'Varies',
      image: '/images/hero-main.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover our comprehensive range of beauty and wellness services, all delivered by our expert professionals
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.id}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className="service-card">
                  <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  {/* Service Details */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Info */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={18} className="text-primary" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <Award size={18} />
                      <span>{service.price}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href="/contact">
                    <a className="btn-dashed w-full text-center">
                      Book This Service
                    </a>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container">
          <ScrollReveal className="section-heading">
            <h2 className="mb-4">Why Choose Beautyeo?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering exceptional beauty experiences
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Expert Professionals',
                description: 'Our team consists of certified and experienced beauty experts',
              },
              {
                icon: Users,
                title: 'Personalized Care',
                description: 'We customize each service to meet your unique needs and preferences',
              },
              {
                icon: Clock,
                title: 'Premium Products',
                description: 'We use only the highest quality, professional-grade beauty products',
              },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="service-card text-center">
                  <div className="flex justify-center mb-4">
                    <item.icon size={40} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <h2 className="mb-6">Ready to Book?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule your appointment today and experience the Beautyeo difference
            </p>
            <Link href="/contact">
              <a className="btn-dashed bg-primary text-primary-foreground border-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 px-8 py-4">
                Book an Appointment <ArrowRight size={20} />
              </a>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
