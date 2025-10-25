import type { LucideIcon } from "lucide-react";

// type item = {
//     title: string;
//     url: string;
    
// }
 
export interface ISidebarItem {
    title: string;
    url: string;
    element?: React.ReactNode;
    icon: LucideIcon;
    badge?: string | null;
}

export type TRole = "ADMIN" | "DRIVER" | "RIDER";