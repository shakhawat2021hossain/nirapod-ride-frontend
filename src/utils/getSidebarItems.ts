import { roles } from "@/constants/role";
import { adminSidebarRoutes } from "@/routes/adminSidebarRoutes";
import { driverSidebarRoutes } from "@/routes/driverSidebarRoutes";
import { riderSidebarRoutes } from "@/routes/riderSidebarRoutes";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch(userRole){
        case roles.admin:
            return [...adminSidebarRoutes]
        case roles.driver:
            return [...driverSidebarRoutes]
        case roles.rider:
            return [...riderSidebarRoutes]
        default:
            return []
    }

}