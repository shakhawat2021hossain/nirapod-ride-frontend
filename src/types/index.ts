import type { LucideIcon } from "lucide-react";



export interface ISidebarItem {
    title?: string;
    url: string;
    element?: React.ReactNode;
    icon?: LucideIcon;
    badge?: string | null;
}

export type TRole = "ADMIN" | "DRIVER" | "RIDER";
export type TAvailability = "ONLINE" | "OFFLINE";


export type TVehicleType = "car"|"bike"|"cng"|"auto";

export interface IVehicle {
    type: TVehicleType;
    model: string;
    plateNum: string;
    // passengerCapacity: number; 
}

// export enum DriverRequestStatus {
//     PENDING = "pending",
//     APPROVED = "approved",
//     REJECTED = "rejected",

// }
export type TDriverRequestStatus = "rejected" | "approved" | "pending"


export interface IDriverRequest {
    status: TDriverRequestStatus;
    vehicleInfo: IVehicle;
    requestedAt: Date;
    approvedAt?: Date;
}
export interface IAuthProvider {
    provider: "credentials" | "google";
    providerId: string
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: TRole;
    picture?: string;
    availability?: TAvailability;
    isDeleted?: boolean;
    auths?: IAuthProvider[];
    address?: string;
    isVerified?: boolean;
    isBlocked?: boolean;
    isApproved?: boolean;
    driverRequest?: IDriverRequest;
    vehicleInfo?: IVehicle
}