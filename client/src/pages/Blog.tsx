import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, User, ArrowRight } from 'lucide-react';

/**
 * Blog Page - Beauty tips and articles
 * Design: Clean article grid with featured post, metadata, and reading time
 */

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Trendy Hair Color Ideas for the Season',
      excerpt: 'Get inspired with our collection of hair color ideas that are trending this season. From vibrant reds to cool blondes, find your perfect shade.',
      content: 'Full article content here...',
      author: 'Sarah Johnson',
      date: 'January 15, 2026',
      readTime: '5 min read',
      image: '/images/services-hair.jpg',
      featured: true,
    },
    {
      id: 2,
      title: 'The Benefits of Regular Body Exfoliation',
      excerpt: 'Discover how exfoliating can improve your skin\'s texture and appearance. Learn about different exfoliation methods and their benefits.',
      content: 'Full article content here...',
      author: 'Emma Davis',
      date: 'January 12, 2026',
      readTime: '4 min read',
      image: '/images/services-body-treatment.jpg',
      featured: false,
    },
    {
      id: 3,
      title: '10 Tips for Healthy Nails',
      excerpt: 'Learn how to keep your nails strong and beautiful. Discover professional tips and daily habits that promote nail health.',
      content: 'Full article content here...',
      author: 'Lisa Chen',
      date: 'January 10, 2026',
      readTime: '6 min read',
      image: '/images/services-nails.jpg',
      featured: false,
    },
    {
      id: 4,
      title: 'Master the Art of Flawless Makeup',
      excerpt: 'Discover the secrets to a perfect makeup look for any occasion. Learn professional techniques and product recommendations.',
      content: 'Full article content here...',
      author: 'Maria Rodriguez',
      date: 'January 8, 2026',
      readTime: '7 min read',
      image: '/images/services-makeup.jpg',
      featured: false,
    },
    {
      id: 5,
      title: 'The Ultimate Guide to Glowing Skin',
      excerpt: 'Learn how to achieve a radiant complexion with our expert skincare tips. From daily routines to professional treatments.',
      content: 'Full article content here...',
      author: 'Sarah Johnson',
      date: 'January 5, 2026',
      readTime: '8 min read',
      image: '/images/hero-main.jpg',
      featured: false,
    },
    {
      id: 6,
      title: 'Hair Care Secrets from Professionals',
      excerpt: 'Get gorgeous hair with our pro tips. Learn how to care for your hair and create stunning hairstyles at home.',
      content: 'Full article content here...',
      author: 'Emma Davis',
      date: 'January 3, 2026',
      readTime: '5 min read',
      image: '/images/services-hair.jpg',
      featured: false,
    },
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Beauty Tips & Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover expert advice, beauty trends, and wellness tips from our team of professionals
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 md:py-32 bg-background">
          <div className="container">
            <ScrollReveal>
              <div className="service-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-80 rounded-xl overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {featuredPost.date}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <User size={16} className="text-primary" />
                      <span className="font-semibold">{featuredPost.author}</span>
                    </div>
                    <button className="btn-dashed mt-6">
                      Read Full Article
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container">
          <ScrollReveal className="mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <div className="service-card flex flex-col h-full">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 flex-1">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <User size={14} className="text-primary" />
                        <span className="font-semibold text-xs">{post.author}</span>
                      </div>
                      <button className="text-primary font-semibold hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                        Read <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">Don't Miss Our Latest Tips</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to our newsletter for weekly beauty tips, exclusive offers, and wellness advice
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
