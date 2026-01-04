"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  to,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  to?: string;
}) => {
  const content = (
    <motion.p
      transition={{ duration: 0.3 }}
      className="cursor-pointer text-foreground/80 hover:text-foreground font-medium"
    >
      {item}
    </motion.p>
  );

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {to ? <Link to={to}>{content}</Link> : content}
      <AnimatePresence>
        {active !== null && active === item && children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={transition}
            className="absolute top-[calc(100%_+_1.2rem)] left-1/2 -translate-x-1/2 pt-4"
          >
            <motion.div
              transition={transition}
              layoutId="active"
              className="glass-glow rounded-2xl overflow-hidden border border-border/40 shadow-2xl"
            >
              <motion.div
                layout
                className="w-max h-full p-4"
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full glass-glow flex justify-center space-x-6 px-8 py-4"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link to={href} className="flex space-x-3 group">
      <img
        src={src}
        alt={title}
        className="shrink-0 rounded-lg shadow-lg w-[140px] h-[80px] object-cover"
      />
      <div>
        <h4 className="text-base font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-muted-foreground text-sm max-w-[12rem]">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, to, className, ...rest }: { children: React.ReactNode; to: string; className?: string }) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-muted-foreground hover:text-foreground transition-colors block py-1",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
