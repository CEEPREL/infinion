import React, { useState } from "react";
import { ThemeToggle } from "../ui/buttons/theme-toggle";
import Notification from "../user/notification";
import Profile from "../user/profile";

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="relative">
        <HamburgerButton toggle={toggleSidebar} isOpen={isOpen} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-60 transform bg-white dark:bg-dark1 border-e border-gray-300 dark:text-white text-black
        transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex`}
      >
        <SidebarContent onLinkClick={() => setIsOpen(false)} />
      </div>

      {/* Overlay when sidebar is open (on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

//==== Side-bar item  ====

type SidebarProps = {
  onLinkClick?: () => void;
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", src: "/icons/dashboard.svg" },
  { label: "User", href: "/user", src: "/icons/user.svg" },
  { label: "Vouchers", href: "/vouchers", src: "/icons/voucher.svg" },
  { label: "Analytics", href: "/analytics", src: "/icons/analytics.svg" },
  { label: "Spotlight", href: "/spotlight", src: "/icons/star.svg" },
];

export const SidebarContent: React.FC<SidebarProps> = ({ onLinkClick }) => {
  return (
    <div className="flex h-full flex-col justify-between px-4 py-6">
      <div>
        <div className="mb-6 px-4">
          <img alt="Logo" src="/logo.svg" className="size-16" />
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} onClick={onLinkClick} />
          ))}
        </ul>
      </div>
      <div className="flex flex-row items-center gap-4">
        <span className="md:hidden flex flex-row gap-2">
          <Notification />
          <Profile />
        </span>

        <ThemeToggle />
      </div>
    </div>
  );
};

type Props = {
  label: string;
  href: string;
  src: string;
  onClick?: () => void;
};

export const NavItem: React.FC<Props> = ({ label, href, src, onClick }) => {
  return (
    <li>
      <a
        href={href}
        onClick={() => {
          console.log(`${label} clicked`);
          if (onClick) onClick();
        }}
        className="flex items-center px-2 py-2 text-sm font-medium text-gray-500 hover:bg-hover hover:border-s-4 hover:border-[#3B82F6] hover:text-gray-300 transition-all duration-200"
      >
        <img src={src} alt={label} className="w-5 h-5" />
        <span className="pl-4">{label}</span>
      </a>
    </li>
  );
};

//====Hamburger Menu for mobile====
type HamburgerProps = {
  toggle: () => void;
  isOpen: boolean;
};

export const HamburgerButton: React.FC<HamburgerProps> = ({
  toggle,
  isOpen,
}) => {
  return (
    <button
      onClick={toggle}
      className="p-4 focus:outline-none md:hidden z-50 absolute"
      aria-label="Toggle sidebar"
    >
      <div className="space-y-1">
        <span
          className={`block h-0.5 w-6 bg-black dark:bg-white transform transition duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black dark:bg-white transition duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black dark:bg-white transform transition duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </div>
    </button>
  );
};
