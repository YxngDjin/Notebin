/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { dateFormatter } from '@/lib/utils';
import axios from 'axios';
import { codeToHtml } from "shiki";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/CopyButton';
import { notFound, useRouter } from 'next/navigation';
import ShareButton from '@/components/ShareButton';
import { useEffect, useState } from 'react';
import { Snippet } from '../../../../../packages/types';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';



const Page = () => {
    const { slug } = useParams();
    const router = useRouter();

    const [snippet, setSnippet] = useState<Snippet>()
    const [isProtected, setIsProtected] = useState<boolean>(false);
    const [highlightedCode, setHighlightedCode] = useState<string>("");
    const [password, setPassword] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (!snippet?.content) return;
        codeToHtml(snippet.content, {
            lang: snippet.language,
            theme: "tokyo-night",
        }).then(setHighlightedCode);
    }, [snippet]);


    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/snippets/${slug}`)
                setSnippet(response.data.data);

                if (response.data?.isProtected) {
                    setIsProtected(true);
                    setSnippet(response.data.data);
                    toast.warning("This Snippet is Protected.", {
                        description: "Fill out the Password Form.",
                        position: "top-center"
                    })
                }

            } catch (e) {
                console.error(e);
                if (axios.isAxiosError(e) && e.response?.status === 404) {
                    toast.error("Snippet not Found", { position: "top-center" })
                    notFound()
                }
                toast.error("Something went wrong", { position: "top-center" })
            }
        }
        fetchSnippet()
    }, [slug]);

    const onSubmit = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/snippets/${slug}/unlock`, {
                password
            });    

            if (response.status === 200) {
                setIsProtected(false);
                toast.success("Snippet Unlocked Successfully", { position: "top-center" })
                setSnippet(response.data.data);
            }

        } catch (e: any) {
            if (e.response?.status === 401) {
                setIsInvalid(true);
                toast.error("Incorrect Password", { position: "top-center" })
                return;
            }

            console.log(e);
            toast.error("Something went wrong", { 
                position: "top-center",
                description: "Please look at the Console for more information."
            })
        }
    }

  return (
    <div className='md:max-w-3xl md:p-0 p-4 mx-auto flex flex-col gap-4'>
        {isProtected && (
            <Dialog open={isProtected}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className="flex gap-2 items-center"> <LockIcon /> Protected Snippet</DialogTitle>
                        <DialogDescription>This Snippet is Protected. Please enter the password to view the content.</DialogDescription>
                    </DialogHeader>
                        <Field data-invalid={isInvalid} className='max-w-sm'>
                            <FieldLabel htmlFor='password'>Password</FieldLabel>
                            <InputGroup>
                                <InputGroupInput 
                                    id='password'
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputGroupAddon align="inline-end">
                                    {showPassword ? (
                                        <EyeIcon onClick={() => setShowPassword(false)} />
                                    ): (
                                        <EyeOffIcon onClick={() => setShowPassword(true)} />
                                    )}
                                </InputGroupAddon>
                            </InputGroup>
                            <FieldDescription>Enter the password to view the content.</FieldDescription>
                        </Field>
                    <DialogFooter>
                            <Button onClick={() => router.push("/")} >Cancel</Button>
                            <Button onClick={onSubmit}>Unlock</Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}

        <div className='flex items-center justify-between'>
            <div className='flex gap-2 flex-col'>
                <h2 className='text-2xl font-semibold'>{snippet?.title}</h2>
                <div className='flex items-center max-md:flex-col gap-3'>
                    <Badge className='bg-[#EEEDFE] text-[#534AB7]'>{(snippet?.language ?? '').charAt(0).toUpperCase() + (snippet?.language ?? '').slice(1)}</Badge>
                    <p className='text-xs text-muted-foreground'>{dateFormatter(snippet?.createdAt ?? '')}</p>
                    <p className='text-xs text-muted-foreground'>{snippet?.expiresAt || "Never expires"} </p>
                </div>
            </div>
            <div className='flex gap-4  max-md:flex-col'>
                <CopyButton content={snippet?.content ?? ''} />
                <ShareButton 
                    code={highlightedCode}
                    title={snippet?.title ?? ''}
                    language={snippet?.language ?? ''}
                />
            </div>
        </div>
        <div className='border bg-[#1a1b26] overflow-hidden rounded-2xl '>
            <div className='flex items-center justify-between max-md:flex-row px-4 py-2 bg-[#16171f] border-b rounded-t-2xl border-white/10'>
                <span className='text-xs text-zinc-400 font-mono'>{snippet?.language}</span>
                {snippet?.content ? (
                    <span className='text-xs text-zinc-400'>{snippet?.content.split('\n').length ?? 0} lines</span>
                ): (
                    <p></p>
                )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </div>
        <div className='rounded-xl border flex items-center justify-between bg-card w-full p-4'>
            <div className='flex gap-4'>
                <p className='max-md:hidden text-sm text-muted-foreground'>Share link</p>
                <a className='text-sm text-[#534AB7]' href={`notebin.local/s/${snippet?.slug}`}>{`notebin.local/s/${snippet?.slug}`}</a>
            </div>
            <Button variant="default" className="max-md:hidden">
                Copy Link
            </Button>
        </div>
    </div>
  )
}

export default Page

// <div className="[&_pre]:whitespace-pre-wrap [&_pre]:break-all" dangerouslySetInnerHTML={{ __html: codeSnipped}} />