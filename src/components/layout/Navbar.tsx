import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem, Menu as NavMenu, HoveredLink, ProductItem } from "@/components/ui/navbar-menu";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const serviceLinks = [
  { name: "Web Development", path: "/services/web-development", description: "Modern, responsive websites" },
  { name: "SEO", path: "/services/seo", description: "Boost your search rankings" },
  { name: "Social Media", path: "/services/social-media-marketing", description: "Grow your audience" },
  { name: "Branding", path: "/services/branding", description: "Build your identity" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();
  const { scrollY } = useScroll();

  const blur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(12px)"]);
  const background = useTransform(
    scrollY,
    [0, 120],
    ["hsl(222 47% 4% / 0.5)", "hsl(222 47% 4% / 0.9)"]
  );

  useEffect(() => {
    setIsOpen(false);
    setActive(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 px-3 md:px-4"
    >
      <motion.nav
        style={{ backdropFilter: blur, background }}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/30 px-4 md:px-6 py-3 shadow-[0_0_40px_hsl(187_100%_50%/0.08)]"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-[0_0_20px_hsl(187_100%_50%/0.4)]"
          >
            <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-extrabold text-primary-foreground">
              N
            </span>
          </motion.div>
          <motion.span 
            className="text-lg md:text-xl font-bold tracking-tight text-foreground"
            whileHover={{ scale: 1.02 }}
          >
            Nexera
          </motion.span>
        </Link>

        {/* Desktop Navigation with Animated Menu */}
        <div className="hidden lg:flex items-center">
          <NavMenu setActive={setActive}>
            {navLinks.slice(0, 2).map((link) => (
              <MenuItem 
                key={link.path} 
                setActive={setActive} 
                active={active} 
                item={link.name}
                to={link.path}
              />
            ))}
            
            {/* Services Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="flex flex-col space-y-3 text-sm min-w-[200px]">
                {serviceLinks.map((service) => (
                  <HoveredLink key={service.path} to={service.path}>
                    <span className="font-semibold">{service.name}</span>
                    <span className="text-xs text-muted-foreground block">{service.description}</span>
                  </HoveredLink>
                ))}
              </div>
            </MenuItem>

            {navLinks.slice(2).map((link) => (
              <MenuItem 
                key={link.path} 
                setActive={setActive} 
                active={active} 
                item={link.name}
                to={link.path}
              />
            ))}
          </NavMenu>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button asChild className="rounded-full px-6 py-2 font-bold shadow-[0_0_20px_hsl(187_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(187_100%_50%/0.5)]">
              <Link to="/contact" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 md:inset-x-4 top-[76px] z-40 rounded-2xl glass-glow p-6 lg:hidden max-h-[calc(100vh-100px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {navLinks.slice(0, 2).map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-lg font-bold py-2 transition-colors ${
                      location.pathname === link.path
                        ? "text-primary glow-text"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Services Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="py-2"
              >
                <p className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                  Services <ChevronDown className="h-4 w-4" />
                </p>
                <div className="pl-4 border-l-2 border-primary/30 space-y-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block text-base text-muted-foreground hover:text-foreground py-1 font-medium transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {navLinks.slice(2).map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 3) * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-lg font-bold py-2 transition-colors ${
                      location.pathname === link.path
                        ? "text-primary glow-text"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button asChild className="mt-4 w-full rounded-full font-bold shadow-[0_0_20px_hsl(187_100%_50%/0.3)]">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
