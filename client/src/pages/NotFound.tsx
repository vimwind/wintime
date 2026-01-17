import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <div className="text-9xl font-bold text-primary mb-4">404</div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <a className="btn-dashed bg-primary text-primary-foreground border-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2 px-8 py-4">
                <Home size={20} />
                Back to Home
              </a>
            </Link>
            <Link href="/services">
              <a className="btn-dashed inline-flex items-center justify-center gap-2 px-8 py-4">
                <ArrowLeft size={20} />
                View Services
              </a>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
