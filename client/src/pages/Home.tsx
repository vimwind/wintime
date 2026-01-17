import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useAuth } from '@/_core/hooks/useAuth';

/**
 * Home Page - Modern Luxury Minimalism
 * Design: Sophisticated simplicity with premium imagery, generous whitespace,
 * and smooth scroll-triggered animations. Emphasis on high-quality beauty photography.
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const services = [
    {
      id: 1,
      title: 'Hair Styling & Coloring',
      description: 'From trendy cuts to vibrant colors, our skilled stylists will transform your hair',
      image: '/images/services-hair.jpg',
    },
    {
      id: 2,
      title: 'Nail Care & Styling',
      description: 'Pamper yourself with our luxurious manicure and pedicure services',
      image: '/images/services-nails.jpg',
    },
    {
      id: 3,
      title: 'Professional Makeup',
      description: 'Enhance your natural beauty with our professional makeup services',
      image: '/images/services-makeup.jpg',
    },
    {
      id: 4,
      title: 'Body Treatments',
      description: 'Indulge in our pampering body treatments to nourish and rejuvenate your skin',
      image: '/images/services-body-treatment.jpg',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Trendy Hair Color Ideas for the Season',
      excerpt: 'Get inspired with our collection of hair color ideas.',
      image: '/images/services-hair.jpg',
    },
    {
      id: 2,
      title: 'The Benefits of Regular Body Exfoliation',
      excerpt: 'Discover how exfoliating can improve your skin\'s texture.',
      image: '/images/services-body-treatment.jpg',
    },
    {
      id: 3,
      title: '10 Tips for Healthy Nails',
      excerpt: 'Learn how to keep your nails strong and beautiful.',
      image: '/images/services-nails.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-main.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover the Beauty Within You
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
              Indulge in our wide range of beauty services and experience the highest quality treatments
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <a className="btn-dashed bg-primary text-primary-foreground border-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2">
                  Our Services <ArrowRight size={18} />
                </a>
              </Link>
              <Link href="/contact">
                <a className="btn-dashed border-white text-white hover:bg-white hover:text-foreground inline-flex items-center justify-center gap-2">
                  Book Now <ArrowRight size={18} />
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <ScrollReveal className="section-heading">
            <h2 className="mb-4">Our Premium Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience luxury beauty treatments delivered by our expert professionals
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.id}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className="service-card group">
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="flex gap-3">
                    <Link href="/services">
                      <a className="btn-dashed">Learn More</a>
                    </Link>
                    <Link href="/contact">
                      <a className="btn-dashed">Book Now</a>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <Sparkles className="text-primary" size={40} />
            </div>
            <h2 className="mb-6">Book Your Appointment Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Quick and convenient booking for all your beauty needs. Our expert team is ready to pamper you.
            </p>
            <Link href="/contact">
              <a className="btn-dashed bg-primary text-primary-foreground border-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 px-8 py-4">
                Schedule Now <ArrowRight size={20} />
              </a>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <ScrollReveal className="section-heading">
            <h2 className="mb-4">Discover Beauty Secrets</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest beauty tips and expert advice
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <div className="service-card">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Link href="/blog">
                    <a className="text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-2">
                      Read More <ArrowRight size={16} />
                    </a>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-32 bg-foreground text-primary-foreground">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">Stay Connected with Us</h2>
            <p className="text-lg opacity-90 mb-8">
              Sign up for our newsletter to receive updates, promotions, and beauty tips
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-primary-foreground text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </button>
            </form>
            <p className="text-sm opacity-75 mt-4">
              By signing up, you agree to our Privacy Policy
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
