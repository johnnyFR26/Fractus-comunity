
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
import axios, { Axios } from "axios";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";


export const InviteModal = () => {

    const {isOpen, onClose, type, data, onOpen} = useModalStore();
    const {server} = data

    const origin = useOrigin();
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const isModalOpen = isOpen && type === "invite";

    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }

    const onNew = async () => {
        try{
            setLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

            onOpen("invite", {server: response.data})

        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  

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
                    <Input disabled={loading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    defaultValue={inviteUrl}
                    />
                    <Button disabled={loading} size={"icon"} onClick={onCopy}>
                        {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                        
                    </Button>
                </div>
                <Button
                variant={"link"}
                className="text-xs text-zinc-500 mt-4"
                size={"sm"}
                onClick={onNew}
                disabled={loading}
                >
                    Gerar novo link
                    <RefreshCcw className="w-4 h-4 ml-2"/>
                </Button>

               </div>
            </DialogContent>
        </Dialog>
    );
};

export default InviteModal;
