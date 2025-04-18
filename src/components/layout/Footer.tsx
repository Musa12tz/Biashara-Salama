
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Copyright 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t px-4 py-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Biashara Salama</h3>
          <p className="text-muted-foreground text-sm">
            Streamline your business management with our comprehensive solution.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Dashboard
            </Link>
            <Link 
              to="/sales" 
              className="block text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Sales
            </Link>
            <Link 
              to="/reports" 
              className="block text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Reports
            </Link>
            <Link 
              to="/settings" 
              className="block text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary"
            >
              <Facebook />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary"
            >
              <Twitter />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary"
            >
              <Instagram />
            </a>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Copyright */}
      <div className="text-center text-muted-foreground text-sm flex items-center justify-center">
        <Copyright className="mr-2 h-4 w-4" />
        <span>{currentYear} Biashara Salama. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
