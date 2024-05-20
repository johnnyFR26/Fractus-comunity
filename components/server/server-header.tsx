"use client"
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole, Server } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { Separator } from "../ui/separator";
import { useModalStore } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles,
    role?: MemberRole
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {

    const {onOpen} = useModalStore()

    const isAdmin = role === MemberRole.ADMIN
    const isModerator = isAdmin || role === MemberRole.MODERATOR

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none" asChild>
                    <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/20 transition">
                        {server.name}
                        <ChevronDown className="ml-auto h-5 w-5" />

                    </button>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                    {isModerator && (
                    <DropdownMenuItem onClick={() => onOpen("invite", {server})} className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                        Convidar membros
                        <UserPlus className="ml-auto h-4 w-4"/>
                    </DropdownMenuItem>)}
                    {isAdmin && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                        Configurações do servidor
                        <Settings className="ml-auto h-4 w-4"/>
                    </DropdownMenuItem>)}
                    {isAdmin && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                        Gerenciar membros
                        <Users className="ml-auto h-4 w-4"/>
                    </DropdownMenuItem>)}
                    {isModerator && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                        Criar novo canal
                        <PlusCircle className="ml-auto h-4 w-4"/>
                    </DropdownMenuItem>)}
                    {isModerator && (
                        <DropdownMenuSeparator/>
                    )}
                    {isAdmin && (
                    <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                        Deletar Servidor
                        <Trash className="ml-auto h-4 w-4"/>
                    </DropdownMenuItem>)}
                    {!isAdmin && (
                    <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
                        Sair do servidor
                        <LogOut className="ml-auto h-4 w-4"/>
                    </DropdownMenuItem>)}

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
