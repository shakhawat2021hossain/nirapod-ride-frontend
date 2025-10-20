import type { ISidebarItem } from "@/types"

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
    return sidebarItems.flatMap(item =>{
        return item.items.map(route=> ({
            path: route.title,
            element: route.element,
        }))
    })
}
