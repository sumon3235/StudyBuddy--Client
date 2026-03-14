
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <h2 className="nunito-font text-2xl font-bold mb-3">StudyBuddy</h2>
            <p className="text-base-content/60 text-sm leading-relaxed">
              A platform where friends study together, create assignments, and grow academically — all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="nunito-font font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-base-content/60">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/all-assignments" className="hover:text-primary transition-colors">Assignments</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">Register</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="nunito-font font-bold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-base-content/60">
              <li>📧 support@studybuddy.com</li>
              <li>📍 Dhaka, Bangladesh</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-base-content/10 pt-6 text-center text-sm text-base-content/40">
          © {new Date().getFullYear()} StudyBuddy. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;