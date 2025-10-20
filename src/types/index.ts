type item = {
    title: string;
    url: string;
    element?: React.ReactNode;
}
 
export interface ISidebarItem {
    title: string;
    url: string;
    items: item[];
}

export type TRole = "ADMIN" | "DRIVER" | "RIDER";