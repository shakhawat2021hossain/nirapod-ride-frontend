import {
  BoltIcon,
  Layers2Icon,
  LogOutIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authApi, useLogOutMutation } from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { roles } from "@/constants/role";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import toast from "react-hot-toast";

type userProps = {
  name: string;
  email: string;
  photo?: string;
};

export default function UserMenu({ name, email, photo }: userProps) {
  const [logOut] = useLogOutMutation()
  const { data: userInfo } = useUserInfoQuery(undefined)
  // console.log(userData);
  const dashboardLink = userInfo?.role === roles.admin ? '/admin' : userInfo?.role === roles.driver ? '/driver' : '/rider';

  const dispatch = useDispatch()
  const handleLogout = async () => {
    const result = await logOut(undefined)
    console.log(result);
    toast.success("Logged out successfully")

    // logout clear api state (jate kore login er r data thakbe na)
    dispatch(authApi.util.resetApiState())

  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage
              src={photo || "/default-avatar.png"}
              alt={name || "User"}
            />
            <AvatarFallback>
              {name ? name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {name || "Katherine Kennedy"}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email || "test@gmail.com"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
           
              <NavLink to={dashboardLink} className="">Dashboard</NavLink>
            
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <NavLink to={`/profile/${userInfo?._id}`} className="">Profile</NavLink>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
