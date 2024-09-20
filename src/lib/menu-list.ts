import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  BoxIcon,
  BadgeDollarSign
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Master",
      menus: [
        {
          href: "/master-data",
          label: "Master Data",
          active: pathname.includes("/master-data"),
          icon: BoxIcon,
          submenus: []
        },
        {
          href: "/member",
          label: "Member",
          active: pathname.includes("/member"),
          icon: BoxIcon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Transaction",
      menus: [
        {
          href: "/sales",
          label: "Sales",
          active: pathname.includes("/sales"),
          icon: BoxIcon,
          submenus: []
        },
        {
          href: "/payment",
          label: "Payment",
          active: pathname.includes("/payment"),
          icon: BadgeDollarSign,
          submenus: []
        }
      ]
    },

    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
