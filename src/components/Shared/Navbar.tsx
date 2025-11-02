import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, NavLink } from "react-router-dom"
import Logo from "../../assets/nirapod-ride.png"
import { ModeToggle } from "../ui/mode-toggle"

import UserMenu from "@/components/user-menu"
import { roles } from "@/constants/role"
import { useUserInfoQuery } from "@/redux/features/user/user.api"
import BecomeDriver from "./BecomeDriver"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
]

export default function Navbar() {
  const { data: userInfo } = useUserInfoQuery(undefined)
  console.log(userInfo)
  const userEmail = userInfo?.email;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 transition-all duration-200">
      <div className="flex max-w-7xl mx-auto h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <NavLink
                          to={link.href}
                          className={({ isActive }) =>
                            `block w-full px-2 transition-colors hover:text-primary ${isActive
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to={"/"} className="hover:opacity-90 transition-opacity">
              <img className="h-16 w-auto" src={Logo} alt="Nirapod Ride" />
            </Link>

            {/* Desktop navigation */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-6">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `py-1.5 font-medium transition-colors hover:text-primary ${isActive
                            ? "text-primary"
                            : "text-muted-foreground"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />


          {/* If user is logged in */}
          {userEmail ? (
            <div className="flex items-center gap-3">
              {
                userInfo?.role === roles.rider &&
                <div className="flex space-x-4 items-center">
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                  >
                    <Link to="/book-ride">Book a Ride</Link>
                  </Button>
                  <BecomeDriver />
                </div>
              }
              <UserMenu name={userInfo.name} email={userInfo.email} />

            </div>
          ) : (
            // If not logged in
            <>

              <Button
                asChild
                variant="default"
                size="sm"
                className="text-sm font-medium"
              >
                <Link to={"/login"}>Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
