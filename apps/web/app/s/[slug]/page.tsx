
import { dateFormatter } from '@/lib/utils';
import axios from 'axios';
import { codeToHtml } from "shiki";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/CopyButton';
import { notFound } from 'next/navigation';
import ShareButton from '@/components/ShareButton';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    
    let snippet;
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/snippets/${slug}`)
        snippet = response.data.data;
    } catch (e) {
        console.log(e);
        notFound();
    }

    const codeSnipped = await codeToHtml(snippet.content, {
        lang: snippet.language,
        theme: "tokyo-night",
    });

  return (
    <div className='md:max-w-3xl md:p-0 p-4 mx-auto flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
            <div className='flex gap-2 flex-col'>
                <h2 className='text-2xl font-semibold'>{snippet.title}</h2>
                <div className='flex items-center max-md:flex-col gap-3'>
                    <Badge className='bg-[#EEEDFE] text-[#534AB7]'>{snippet.language.charAt(0).toUpperCase() + snippet.language.slice(1)}</Badge>
                    <p className='text-xs text-muted-foreground'>{dateFormatter(snippet.createdAt)}</p>
                    <p className='text-xs text-muted-foreground'>{snippet.expiresAt || "Never expires"} </p>
                </div>
            </div>
            <div className='flex gap-4  max-md:flex-col'>
                <CopyButton content={snippet.content} />
                <ShareButton 
                    code={codeSnipped}
                    title={snippet.title}
                    language={snippet.language}
                />
            </div>
        </div>
        <div className='border bg-[#1a1b26] overflow-hidden rounded-2xl '>
            <div className='flex items-center justify-between max-md:flex-row px-4 py-2 bg-[#16171f] border-b rounded-t-2xl border-white/10'>
                <span className='text-xs text-zinc-400 font-mono'>{snippet.language}</span>
                <span className='text-xs text-zinc-400'>{snippet.content.split('\n').length} lines</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: codeSnipped }} />
        </div>
        <div className='rounded-xl border flex items-center justify-between bg-card w-full p-4'>
            <div className='flex gap-4'>
                <p className='max-md:hidden text-sm text-muted-foreground'>Share link</p>
                <a className='text-sm text-[#534AB7]' href={`notebin.local/s/${snippet.slug}`}>{`notebin.local/s/${snippet.slug}`}</a>
            </div>
            <Button variant="default" className="max-md:hidden">
                Copy Link
            </Button>
        </div>
    </div>
  )
}

export default page

// <div className="[&_pre]:whitespace-pre-wrap [&_pre]:break-all" dangerouslySetInnerHTML={{ __html: codeSnipped}} />