import ScrollReveal from '@/components/ScrollReveal';
import { Heart, Lightbulb, Users, Target } from 'lucide-react';

/**
 * About Page - Salon story, team, and values
 * Design: Narrative-driven with emphasis on brand story and team expertise
 */

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Beauty',
      description: 'We are passionate about helping our clients feel confident and beautiful',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay updated with the latest beauty trends and techniques',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build lasting relationships with our clients and team members',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every service we provide',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Lead Stylist',
      bio: 'With 15+ years of experience, Sarah founded Beautyeo to create a sanctuary for beauty and wellness.',
      image: '/images/services-hair.jpg',
    },
    {
      name: 'Emma Davis',
      role: 'Master Colorist',
      bio: 'Emma specializes in creative hair coloring and has won multiple awards for her innovative techniques.',
      image: '/images/services-nails.jpg',
    },
    {
      name: 'Lisa Chen',
      role: 'Makeup Artist & Aesthetician',
      bio: 'Lisa brings artistic vision to every makeup application and facial treatment with precision and care.',
      image: '/images/services-makeup.jpg',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Wellness & Spa Specialist',
      bio: 'Maria creates personalized wellness experiences through our body treatments and massage therapies.',
      image: '/images/services-body-treatment.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Beautyeo</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover the story behind our luxury salon and the passionate team dedicated to your beauty
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Beautyeo was founded with a simple vision: to create a sanctuary where beauty, wellness, and self-care converge. Our founder, Sarah Johnson, spent years perfecting her craft and realized that true beauty goes beyond treatments—it's about creating an experience.
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Today, Beautyeo stands as a testament to that vision. We've assembled a team of passionate professionals who share our commitment to excellence and client satisfaction. Every service we provide is delivered with care, expertise, and a touch of luxury.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our mission is simple: to help every client discover and celebrate their unique beauty while providing an unforgettable salon experience.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img
                  src="/images/hero-main.jpg"
                  alt="Our Salon"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container">
          <ScrollReveal className="section-heading">
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Beautyeo
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="service-card">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <value.icon size={32} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <ScrollReveal className="section-heading">
            <h2 className="mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to your beauty and wellness
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="service-card">
                  <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Years of Experience' },
              { number: '5000+', label: 'Happy Clients' },
              { number: '50+', label: 'Services Offered' },
              { number: '10', label: 'Expert Professionals' },
            ].map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-lg text-muted-foreground">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
