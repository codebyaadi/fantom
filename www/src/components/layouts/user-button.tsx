import React from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/userStore";

const UserAvatar = ({ name, avatar }: { name: string; avatar: string }) => {
    return (
        <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
    )
}

export const UserButton = ({ name, avatar }: { name: string; avatar: string }) => {
    const { logout } = useAuthStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 w-auto rounded-full focus-visible:ring-0">
                    <UserAvatar name={name} avatar={avatar} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
