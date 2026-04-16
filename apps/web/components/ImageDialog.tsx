"use client"

import React, { useState, useRef } from 'react'
import { Separator } from './ui/separator'
import { GRADIENTS } from '@/app/constants/gradients';
import { Button } from './ui/button';
import { toPng } from "html-to-image";
import { XIcon } from 'lucide-react';

const ImageDialog = ({ code, title, language, onClose }: { code: string, title: string, language: string, onClose: () => void }) => {

    const previewRef = useRef<HTMLDivElement>(null);
    const [gradient, setGradient] = useState<string>(GRADIENTS[0].id);
    const selectedGradient = GRADIENTS.find(g => g.id === gradient) ?? GRADIENTS[0];

    const handleDownload = async () => {
    if (!previewRef.current) return;
    const png = await toPng(previewRef.current, {
            cacheBust: true,
            style: {
                borderRadius: '16px',
            },
            pixelRatio: 2,
        });
        const link = document.createElement('a');
        link.download = `${title}.png`;
        link.href = png;
        link.click()
    }

  return (
    <div className='max-w-2xl bg-card p-4 rounded-2xl border mx-auto'>
        <div className='w-full flex items-center justify-between mb-3 clear-start'>
            <h1 className='font-semibold'>Share as image</h1>
            <Button 
                variant="outline"
                onClick={() => onClose()}
            >
                <XIcon />
            </Button>
        </div>
        <Separator />
        <div className='my-3 p-1' ref={previewRef}>
            <div
                className='px-6 pt-6 pb-8 flex items-center justify-center my-3 rounded-xl overflow-hidden'
                style={{ background: selectedGradient.value, borderRadius: "12px" }}
            >
                <div className='bg-[#1a1b26] rounded-xl p-4 w-full'>
                    <p className='text-xs text-muted-foreground mb-5'>{language}</p>
                    <div dangerouslySetInnerHTML={{ __html: code }} />
                </div>
            </div>
        </div>

        <div className='flex flex-col py-3 gap-2'>
            <h2 className='text-xs text-muted-foreground'>Background</h2>
            <div className='flex gap-1'>
                {GRADIENTS.map((g) => (
                    <button
                        key={g.id}
                        style={{ background: g.value }}
                        className="h-10 w-10 rounded-lg border"
                        onClick={() => setGradient(g.id)}
                    />
                ))}
            </div>
        </div>
        <Separator />
        <div className='w-full flex mt-4 items-center justify-end-safe gap-3'>
            <Button>
                Cancel
            </Button>
            <Button onClick={handleDownload}>
                Download
            </Button>
        </div>
    </div>
  )
}

export default ImageDialog