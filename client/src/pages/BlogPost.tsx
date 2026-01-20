import { useRoute, Link } from 'wouter';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { trpc } from '@/lib/trpc';

/**
 * Blog Post Page - Individual blog post display
 * Design: Clean, readable typography with featured image, metadata, and related posts
 */

export default function BlogPost() {
  const [match, params] = useRoute('/blog/:id');
  const { data: allBlogPostsData } = trpc.blog.list.useQuery();

  const fallbackBlogPosts = [
    {
      id: '1',
      title: 'Trendy Hair Color Ideas for the Season',
      excerpt: 'Get inspired with our collection of hair color ideas that are trending this season. From vibrant reds to cool blondes, find your perfect shade.',
      content: `
        <h2>Discover Your Perfect Hair Color</h2>
        <p>Hair color is one of the most transformative beauty changes you can make. Whether you're looking for a subtle refresh or a dramatic transformation, there's a shade perfect for you.</p>
        
        <h3>Trending Colors This Season</h3>
        <p>This season, we're seeing a beautiful blend of warm and cool tones dominating the beauty industry. Let's explore the top trends:</p>
        
        <h4>1. Rich Chocolate Browns</h4>
        <p>Deep, luxurious browns are having a major moment. These shades work beautifully on all skin tones and provide a sophisticated, polished look. The key is adding subtle highlights to create dimension and movement.</p>
        
        <h4>2. Warm Honey Blondes</h4>
        <p>Honey blonde is the perfect middle ground between brunette and blonde. It's flattering, low-maintenance, and adds warmth to your complexion. This shade is particularly popular among those looking for a subtle change.</p>
        
        <h4>3. Jewel Tones</h4>
        <p>For the bold and adventurous, jewel tones like emerald, sapphire, and ruby are making waves. These colors are perfect for adding an artistic flair to your look.</p>
        
        <h3>Maintenance Tips</h3>
        <p>Once you've chosen your perfect color, proper maintenance is key to keeping it looking fresh and vibrant:</p>
        <ul>
          <li>Use color-safe shampoo and conditioner</li>
          <li>Limit heat styling when possible</li>
          <li>Deep condition weekly</li>
          <li>Schedule touch-ups every 4-6 weeks</li>
          <li>Protect your hair from UV rays</li>
        </ul>
        
        <h3>Consultation is Key</h3>
        <p>Before making any major color change, we recommend scheduling a consultation with our expert colorists. We'll assess your hair type, skin tone, and lifestyle to recommend the perfect shade for you.</p>
      `,
      author: 'Sarah Johnson',
      date: 'January 15, 2026',
      readTime: '5 min read',
      image: '/images/services-hair.jpg',
      category: 'Hair Care',
    },
    {
      id: '2',
      title: 'The Benefits of Regular Body Exfoliation',
      excerpt: 'Discover how exfoliating can improve your skin\'s texture and appearance. Learn about different exfoliation methods and their benefits.',
      content: `
        <h2>Why Exfoliation is Essential for Healthy Skin</h2>
        <p>Exfoliation is one of the most important steps in any skincare routine. By removing dead skin cells, you reveal smoother, brighter, and healthier-looking skin underneath.</p>
        
        <h3>Understanding Your Skin</h3>
        <p>Your skin naturally sheds dead cells every 28 days. However, sometimes these cells don't shed completely, leading to dull, rough, and congested skin. This is where exfoliation comes in.</p>
        
        <h3>Types of Exfoliation</h3>
        <h4>Physical Exfoliation</h4>
        <p>Physical exfoliants use particles or tools to manually remove dead skin cells. Examples include scrubs, brushes, and pumice stones. These are great for body exfoliation but should be used gently on the face.</p>
        
        <h4>Chemical Exfoliation</h4>
        <p>Chemical exfoliants use acids or enzymes to dissolve dead skin cells. These are gentler and more effective for facial skin. Common types include AHAs and BHAs.</p>
        
        <h3>Benefits of Regular Exfoliation</h3>
        <ul>
          <li>Smoother, softer skin texture</li>
          <li>Brighter complexion</li>
          <li>Reduced appearance of pores</li>
          <li>Better absorption of skincare products</li>
          <li>Improved circulation</li>
          <li>Reduced ingrown hairs</li>
        </ul>
        
        <h3>How Often Should You Exfoliate?</h3>
        <p>For body exfoliation, 2-3 times per week is ideal. For facial exfoliation, once or twice per week is recommended, depending on your skin type. Those with sensitive skin should exfoliate less frequently.</p>
      `,
      author: 'Emma Davis',
      date: 'January 12, 2026',
      readTime: '4 min read',
      image: '/images/services-body-treatment.jpg',
      category: 'Skincare',
    },
    {
      id: '3',
      title: '10 Tips for Healthy Nails',
      excerpt: 'Learn how to keep your nails strong and beautiful. Discover professional tips and daily habits that promote nail health.',
      content: `
        <h2>Achieve Strong, Beautiful Nails</h2>
        <p>Healthy nails are a sign of overall wellness. Whether you prefer natural nails or regular manicures, these tips will help you maintain strong, beautiful nails.</p>
        
        <h3>10 Professional Tips for Nail Health</h3>
        <h4>1. Keep Nails Moisturized</h4>
        <p>Just like skin, nails need moisture. Apply cuticle oil or hand cream regularly to keep nails and cuticles hydrated.</p>
        
        <h4>2. Avoid Harsh Chemicals</h4>
        <p>Wear gloves when cleaning or doing dishes. Harsh chemicals can weaken nails and cause brittleness.</p>
        
        <h4>3. Don't Use Nails as Tools</h4>
        <p>Using your nails to open things or scrape off stickers can cause breakage and damage. Always use appropriate tools instead.</p>
        
        <h4>4. Maintain a Healthy Diet</h4>
        <p>Nails are made of protein, so ensure you're getting enough protein, iron, and B vitamins in your diet.</p>
        
        <h4>5. Keep Nails Trimmed</h4>
        <p>Regular trimming prevents breakage and keeps nails looking neat. Trim every 2-3 weeks for optimal health.</p>
        
        <h4>6. File Gently</h4>
        <p>Use a gentle sawing motion when filing nails. Avoid aggressive back-and-forth motions that can cause splitting.</p>
        
        <h4>7. Limit Nail Polish Use</h4>
        <p>While nail polish is fun, give your nails breaks between applications to allow them to breathe.</p>
        
        <h4>8. Use Quality Products</h4>
        <p>Invest in high-quality nail polish and removers. Cheap products often contain harsh chemicals.</p>
        
        <h4>9. Protect from UV Rays</h4>
        <p>Apply sunscreen to your hands and nails when spending time outdoors to prevent discoloration.</p>
        
        <h4>10. Get Regular Manicures</h4>
        <p>Professional manicures help maintain nail health and allow professionals to spot any issues early.</p>
      `,
      author: 'Lisa Chen',
      date: 'January 10, 2026',
      readTime: '6 min read',
      image: '/images/services-nails.jpg',
      category: 'Nail Care',
    },
  ];

  const allBlogPosts = (allBlogPostsData && allBlogPostsData.length > 0)
    ? allBlogPostsData.map((post: any) => ({
        ...post,
        id: String(post.id),
        date: new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: post.readTime || '5 min read',
        image: post.image || '/images/services-hair.jpg',
        category: 'Beauty',
      }))
    : fallbackBlogPosts;

  const post = allBlogPosts.find((p: any) => p.id === params?.id);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Beautyeo Salon`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.metaDescription || post.excerpt || '');
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', post.keywords || '');
      }
    }
  }, [post]);

  if (!match || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/blog">
            <span className="text-primary hover:text-primary/80 cursor-pointer inline-flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Blog
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allBlogPosts
    .filter((p: any) => p.id !== post?.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="bg-secondary border-b border-border">
        <div className="container py-4">
          <Link href="/blog">
            <span className="text-primary hover:text-primary/80 cursor-pointer inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeft size={16} />
              Back to Blog
            </span>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* Article Header */}
      <section className="bg-background py-12 md:py-16">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User size={18} className="text-primary" />
                <span className="font-semibold">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-20">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <div className="prose prose-lg max-w-none">
              <div
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/<h2>/g, '<h2 class="text-3xl font-bold mt-8 mb-4">')
                    .replace(/<h3>/g, '<h3 class="text-2xl font-bold mt-6 mb-3">')
                    .replace(/<h4>/g, '<h4 class="text-xl font-semibold mt-4 mb-2">')
                    .replace(/<p>/g, '<p class="text-lg text-foreground/90 leading-relaxed">')
                    .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 text-lg">')
                    .replace(/<li>/g, '<li class="text-foreground/90">')
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 border-t border-b border-border">
        <div className="container max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-2">Share this article</h3>
              <p className="text-sm text-muted-foreground">Help others discover this beauty tip</p>
            </div>
            <div className="flex gap-3">
              <button className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                <Share2 size={20} className="text-primary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 md:py-32 bg-secondary">
          <div className="container">
            <ScrollReveal className="mb-12">
              <h2 className="text-3xl font-bold">Related Articles</h2>
              <p className="text-muted-foreground mt-2">Discover more beauty tips and insights</p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <ScrollReveal key={relatedPost.id} delay={index * 0.1}>
                  <Link href={`/blog/${relatedPost.id}`}>
                    <span className="service-card group cursor-pointer block h-full">
                      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{relatedPost.excerpt}</p>
                      <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                        Read More →
                      </div>
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Author Bio */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <div className="bg-secondary rounded-xl p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User size={40} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.author} is a certified beauty professional with over 10 years of experience in the industry. 
                    They specialize in creating personalized beauty solutions and sharing expert tips with our community.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
