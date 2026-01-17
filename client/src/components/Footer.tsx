import { Link } from 'wouter';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';

export default function Footer() {
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <footer className="bg-foreground text-primary-foreground mt-20">
      <div className="container py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-foreground text-sm font-bold">B</span>
              </div>
              <span className="font-bold text-lg">Beautyeo</span>
            </div>
            <p className="text-sm opacity-80">
              Experience luxury beauty treatments and professional salon services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services">
                  <span className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">About</span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-80">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <Mail size={16} />
                <span>hello@beautyeo.com</span>
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <MapPin size={16} />
                <span>123 Beauty Lane, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Facebook size={20} />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Instagram size={20} />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Twitter size={20} />
              </a>
              <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm opacity-80">
          <p>&copy; 2026 Beautyeo Salon. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            
            {/* Admin Login/Logout Button */}
            <div className="ml-4 pl-4 border-l border-primary-foreground/30">
              {isAuthenticated && isAdmin ? (
                <div className="flex items-center gap-3">
                  <Link href="/admin">
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer text-xs font-medium">
                      <Lock size={14} />
                      Admin
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-xs opacity-70 hover:opacity-100 transition-opacity"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <a
                  href={getLoginUrl()}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-xs font-medium"
                >
                  <Lock size={14} />
                  Admin
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
