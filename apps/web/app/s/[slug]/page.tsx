
import { dateFormatter } from '@/lib/utils';
import axios from 'axios';
import { codeToHtml } from "shiki";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    
    let snippet;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/snippets/${slug}`)
        snippet = response.data.data;
    } catch (e) {
        notFound();
    }

    const codeSnipped = await codeToHtml(snippet.content, {
        lang: snippet.language,
        theme: "tokyo-night",
    });

  return (
    <div className='max-w-3xl mx-auto flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
            <div className='flex gap-2 flex-col'>
                <h2 className='text-2xl font-semibold'>{snippet.title}</h2>
                <div className='flex items-center gap-3'>
                    <Badge className='bg-[#EEEDFE] text-[#534AB7]'>{snippet.language.charAt(0).toUpperCase() + snippet.language.slice(1)}</Badge>
                    <p className='text-xs text-muted-foreground'>{dateFormatter(snippet.createdAt)}</p>
                    <p className='text-xs text-muted-foreground'>{snippet.expiresAt || "Never expires"} </p>
                </div>
            </div>
            <div className='flex gap-4'>
                <CopyButton content={snippet.content} />
                <Button variant="default">
                    <DownloadIcon /> Share
                </Button>
            </div>
        </div>
        <div className='border bg-[#1a1b26] overflow-hidden rounded-2xl '>
            <div className='flex items-center justify-between px-4 py-2 bg-[#16171f] border-b rounded-t-2xl border-white/10'>
                <span className='text-xs text-zinc-400 font-mono'>{snippet.language}</span>
                <span className='text-xs text-zinc-400'>{snippet.content.split('\n').length} lines</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: codeSnipped }} />
        </div>
        <div className='rounded-xl border flex items-center justify-between bg-card w-full p-4'>
            <div className='flex gap-4'>
                <p className='text-sm text-muted-foreground'>Share link</p>
                <a className='text-sm text-[#534AB7]' href={`notebin.local/s/${snippet.slug}`}>{`notebin.local/s/${snippet.slug}`}</a>
            </div>
            <Button variant="default">
                Copy Link
            </Button>
        </div>
    </div>
  )
}

export default page

// <div className="[&_pre]:whitespace-pre-wrap [&_pre]:break-all" dangerouslySetInnerHTML={{ __html: codeSnipped}} />