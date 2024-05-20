
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Image from 'next/image'
const svg = require("../../public/vercel.svg")
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Copy, RefreshCcw } from "lucide-react";


export const InviteModal = () => {

    const {isOpen, onClose, type} = useModalStore();
    const isModalOpen = isOpen && type === "invite";
  

    const Router = useRouter();
   
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#f6f9ff] text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Convide novos membros
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Compartilhe o link para entrarem no servidor
                    </DialogDescription>
                </DialogHeader>
               <div className="p-6">
                <Label className="text-xs uppercase font-bold text-zinc-500 dark:text-secondary/70">
                    Convite para o servidor
                </Label>
                <div className="flex items-center mt-2 gap-x-2">
                    <Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    defaultValue={"invite link"}
                    />
                    <Button size={"icon"}>
                        <Copy className="w-4 h-4"/>
                    </Button>
                </div>
                <Button
                variant={"link"}
                className="text-xs text-zinc-500 mt-4"
                size={"sm"}
                >
                    Gerar novo link
                    <RefreshCcw className="w-4 h-4"/>
                </Button>

               </div>
            </DialogContent>
        </Dialog>
    );
};

export default InviteModal;
