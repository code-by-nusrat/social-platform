
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DiYii } from "react-icons/di";
import {
  MdUpcoming,
  MdAddCircleOutline,
  MdEventNote,
  MdBookmarkAdded,
  MdLogout,
} from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

// Private / protected routes (also guarded in middleware.ts)
const profileMenu = [
  { label: "Create Event", href: "/create-event", icon: MdAddCircleOutline },
  { label: "Manage Event", href: "/manage-event", icon: MdEventNote },
  { label: "Joined Event", href: "/joined-event", icon: MdBookmarkAdded },
];

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#007a71] shadow-md dark:bg-[#04302d]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-4xl text-[#FDEB9E]">
            <DiYii />
          </span>
          <span className="text-2xl font-bold text-white">UnityHub</span>
        </Link>

        {/* Upcoming Events */}
        <Link
          href="/upcoming-events"
          className={`relative flex items-center gap-2 text-white transition-colors hover:text-[#FDEB9E]
            after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#FDEB9E] after:transition-all after:duration-300
            ${
              pathname === "/upcoming-events"
                ? "text-[#FDEB9E] after:w-full"
                : "after:w-0 hover:after:w-full"
            }`}
        >
          <MdUpcoming className="text-2xl text-[#FDEB9E]" />
          <span className="hidden text-[1.1rem] sm:inline">Upcoming Events</span>
        </Link>

        {/* Right side: theme toggle + auth area */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4">
              {/* Profile picture + dropdown, name shows on hover */}
              <div className="group relative">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        aria-label="Open profile menu"
                        className="rounded-full outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
                      />
                    }
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-[#FDEB9E]">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image as string}
                        alt={user.name}
                      />
                      <AvatarFallback className="bg-[#04302d] font-semibold text-white">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-60 p-1.5">
                    {/* User info */}
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="px-3 py-2">
                        <p className="truncate text-sm font-semibold text-[#04302d] dark:text-white">
                          {user.name}
                        </p>
                        <p className="truncate text-xs font-normal text-muted-foreground">
                          {user.email}
                        </p>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Private routes */}
                    <DropdownMenuGroup>
                      {profileMenu.map(({ label, href, icon: Icon }) => (
                        <DropdownMenuItem
                          key={href}
                          render={<Link href={href} />}
                          className={`cursor-pointer gap-3 rounded-md px-3 py-2 text-sm focus:bg-[#007a71]/10 focus:text-[#007a71] ${
                            pathname === href
                              ? "bg-[#007a71]/10 font-medium text-[#007a71]"
                              : ""
                          }`}
                        >
                          <Icon className="text-lg" />
                          {label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>

                    {/* Logout inside the menu on small screens only */}
                    <DropdownMenuSeparator className="sm:hidden" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer gap-3 rounded-md px-3 py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-600 sm:hidden"
                    >
                      <MdLogout className="text-lg" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Hover tooltip with display name */}
                <span
                  className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#04302d] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-[#007a71] ${
                    open ? "hidden" : ""
                  }`}
                >
                  {user.name}
                </span>
              </div>

              {/* Logout button */}
              <Button
                onClick={handleSignOut}
                className="hidden gap-2 rounded-full bg-[#FDEB9E] px-5 font-semibold text-[#04302d] transition-all hover:bg-white sm:inline-flex"
              >
                <MdLogout />
                Logout
              </Button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`rounded-full px-6 py-2 text-[1rem] font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                pathname === "/login"
                  ? "bg-white text-[#007a71]"
                  : "bg-[#FDEB9E] text-[#04302d] hover:bg-white"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;