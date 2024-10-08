export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Aalaa Designs",
  description:
    "Aalaa Designs is a hand made clothing brand. We make clothes that are unique and stylish.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "About",
      href: "/about",
    },
    {
      label: "Shop",
      href: "/products",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "https://aalaadesigns-dashboard.com",
    },

    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
