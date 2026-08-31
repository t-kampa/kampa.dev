"use client";

import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      className={cn(
        "hidden w-full border-b border-transparent transition-colors lg:block",
        visible && "border-border/70 bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-row items-center justify-between gap-4 px-6 py-3">
        {children}
      </div>
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  const activeIdx = items.findIndex((item) =>
    item.link === "/" ? pathname === "/" : pathname.startsWith(item.link),
  );
  const highlightedIdx = hovered ?? activeIdx;

  return (
    <nav
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center gap-1 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = idx === activeIdx;

        return (
          <Link
            key={item.link}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 text-sm transition-colors",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {highlightedIdx === idx && (
              <motion.div
                layoutId="hovered"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                  "absolute inset-0 rounded-none",
                  hovered === idx ? "bg-muted/60" : "bg-muted",
                )}
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "w-full border-b border-transparent transition-colors lg:hidden",
        visible && "border-border/70 bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col px-6 py-3">
        {children}
      </div>
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute inset-x-0 top-full z-50 flex flex-col items-start gap-1 border-b border-border bg-popover px-6 py-4 text-popover-foreground shadow-md ring-1 ring-foreground/10",
            className,
          )}
        >
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(
                  child as React.ReactElement<{ onClick?: () => void }>,
                  {
                    onClick: onClose,
                  },
                )
              : child,
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
    >
      {isOpen ? <X /> : <Menu />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center font-mono text-sm font-semibold tracking-tight"
    >
      <span className="text-muted-foreground">~/</span>kampa.dev
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "default",
  size = "sm",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "xs" | "sm" | "default" | "lg";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  return (
    <Tag
      href={href || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
