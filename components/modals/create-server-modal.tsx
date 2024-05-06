
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




const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    imageUrl: z.string().nullable(),
});

export const CreateServerModal = () => {

    const {isOpen, onClose, type} = useModalStore();
    const isModalOpen = isOpen && type === "createServer";
  

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        },
    });
    const isLoading = form.formState.isSubmitting;
    const Router = useRouter();
    const onSubmit = async (values:any) => {
        console.log(values)
        try {
            await axios.post('/api/servers', values);
            form.reset();
            Router.refresh();
        }
        catch (error) {
            console.log(error);
        }
    };
    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-[#f6f9ff] text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize seu servidor
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Crie seu primeiro servidor, voce sempre pode editar depois
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex-items-center justify-center text-center">
                                <input readOnly type="text" className="hidden" placeholder="image URL" value={'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZk9TQjNyUlBqeERhdXR0WHdJZ0ZheW9YeFYiLCJyaWQiOiJ1c2VyXzJmUHJOS0Y2NXFmcEZaaGpIc3p4RDNoV0JhQSJ9'} />
                                
                                <div className="relative h-20 w-20 ">
                                    <Image
                                    fill
                                    alt="image"
                                    src={'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZk9TQjNyUlBqeERhdXR0WHdJZ0ZheW9YeFYiLCJyaWQiOiJ1c2VyXzJmUHJOS0Y2NXFmcEZaaGpIc3p4RDNoV0JhQSJ9'}   
                                    className="rounded-full flex-items-center justify-center"
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 ">
                                                Nome do servidor
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                    placeholder="Entre com o nome do seu servidor"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary"  disabled={isLoading} type="submit">
                                Criar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateServerModal;
