"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href?: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => void;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          // Base layout
          "min-h-screen h-full px-3 py-4 hidden md:flex md:flex-col w-[300px] shrink-0 sticky top-0 left-0",
          // Premium skin
          "bg-gradient-to-b from-slate-900 via-zinc-900 to-zinc-800 text-stone-100",
          "border-r border-zinc-800/40 ring-1 ring-zinc-900/40 shadow-[0_12px_50px_rgba(2,6,23,0.65)]",
          // Subtle glass hint (no custom CSS)
          "backdrop-blur-sm/0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-14 px-4 py-4 flex flex-row md:hidden items-center justify-between w-full",
          // Mobile top bar aesthetic
          "bg-gradient-to-r from-slate-900 via-zinc-900 to-zinc-800 text-stone-100",
          "border-b border-zinc-800/40 shadow-lg"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-stone-100/90 hover:text-stone-100 transition-colors duration-200 hover:scale-110 active:scale-100"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 p-10 z-[100] flex flex-col justify-between",
                // Mobile drawer skin
                "bg-gradient-to-b from-slate-900 via-zinc-900 to-zinc-800 text-stone-100",
                "border-r border-zinc-800/40 shadow-2xl ring-1 ring-zinc-900/30"
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-stone-200 hover:text-stone-50 transition-colors"
                onClick={() => setOpen(!open)}
              >
                <IconX className="hover:scale-110 active:scale-100 transition-transform" />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const router = useRouter();
  
  if (link.onClick && !link.href) {
    return (
      <button
        onClick={link.onClick}
        className={cn(
          // Layout & spacing
          "flex items-center justify-start gap-2 group/sidebar py-2 w-full text-left",
          // Chip styling
          "px-2 rounded-xl",
          // Depth & interactions
          "ring-1 ring-transparent hover:ring-emerald-600/30",
          "hover:bg-gradient-to-r hover:from-zinc-800/40 hover:to-zinc-700/20",
          "transition-all duration-300 hover:translate-x-[2px]",
          className
        )}
      >
        {link.icon}
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-stone-200 text-base font-medium group-hover/sidebar:translate-x-1 group-hover/sidebar:text-emerald-500 transition-all duration-200 whitespace-pre inline-block !p-0 !m-0"
        >
          {link.label}
        </motion.span>
      </button>
    );
  }
  
  // Fix Safari navigation issues by using router
  const handleNavigation = (e: React.MouseEvent) => {
    if (link.href) {
      e.preventDefault();
      // Force hard navigation for certain routes that have issues in Safari
      if (['/profile', '/info', '/socials'].includes(link.href)) {
        window.location.href = link.href;
      } else {
        router.push(link.href);
      }
    }
  };

  return (
    <Link
      href={link.href || "#"}
      onClick={handleNavigation}
      className={cn(
        // Layout
        "flex items-center justify-start gap-2 group/sidebar py-2",
        // Chip styling
        "px-2 rounded-xl",
        // Depth & interactions
        "ring-1 ring-transparent hover:ring-emerald-600/30",
        "hover:bg-gradient-to-r hover:from-zinc-800/40 hover:to-zinc-700/20",
        "transition-all duration-300 hover:translate-x-[2px]",
        className
      )}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-stone-200 text-base font-medium group-hover/sidebar:translate-x-1 group-hover/sidebar:text-emerald-500 transition-all duration-200 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
