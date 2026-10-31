
"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { DiYii } from "react-icons/di";
import { MdUpcoming } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session } = authClient.useSession()
  const user = session?.user;
  console.log(user, 'user')
  const pathname = usePathname();
  const handleSignOut = async () => {
    authClient.signOut()
  }
  return (
    <div className="bg-[#007a71]">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-5 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1 className="text-4xl text-[#FDEB9E]">
            <DiYii />
          </h1>
          <h2 className="text-2xl font-bold text-white">
            UnityHub
          </h2>
        </div>

        {/* Upcoming Events */}
        <Link
          href="/events"
          className="flex items-center gap-2 cursor-pointer text-white hover:text-[#FDEB9E] transition-colors"
        >
          <MdUpcoming className="text-2xl text-[#FDEB9E]" />
          <h3 className="text-[1.1rem]">
            Upcoming Events
          </h3>
        </Link>
        {/*Avator  */}
        {
          user ?
            <Popover>
              <PopoverTrigger render={<button variant="outline" className="text-white" />}>
                <Avatar className=''>
                  <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>

              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>{user?.email}</PopoverDescription>
                  <Button onClick={handleSignOut}>Sign Out</Button>
                </PopoverHeader>
              </PopoverContent>
            </Popover> : <>
              <Link
                href="/login"
                className={`relative text-[1.1rem] text-white cursor-pointer transition-colors hover:text-[#FDEB9E]
            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#FDEB9E] after:transition-all after:duration-300
            ${pathname === "/login" ? "after:w-full text-[#FDEB9E]" : "after:w-0 hover:after:w-full"}
          `}
              >
                Login
              </Link>
            </>
        }



      </div>
    </div>
  );
};

export default Navbar;
