// Icons imports
import { 
  Calendar, 
  LayoutDashboard, 
  BarChart, 
  Brain, 
  Settings, 
  MessageSquare
} from "lucide-react";

// Navigation items
export const NAV_ITEMS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500"
  },
  {
    title: "Analytics",
    icon: BarChart,
    href: "/analytics",
    color: "text-violet-500"
  },
  {
    title: "Mental Wellness",
    icon: Brain,
    href: "/mental-wellness",
    color: "text-emerald-500"
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
    color: "text-orange-500"
  },
  {
    title: "AI Coach Chat",
    icon: MessageSquare,
    href: "/chat",
    color: "text-indigo-500"
  }
]; 