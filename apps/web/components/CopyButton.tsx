"use client";

import { CopyIcon } from 'lucide-react';
import { Button } from './ui/button'
import { useState } from 'react';

const CopyButton = ({content}: { content: string}) => {

    const [text, setText] = useState("Copy")

    const copyToClipboard = () => {
        if (navigator.clipboard) {
                navigator.clipboard.writeText(content)
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        setText("Copied!")
        setTimeout(() => setText("Copy"), 3000)
    }

  return (
    <Button 
        variant="default"
        onClick={copyToClipboard}
    >
        <CopyIcon />
        <span className="relative inline-flex overflow-hidden h-5 w-14">
            <span style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 300ms',
                transform: text === "Copied!" ? 'translateY(-100%)' : 'translateY(0)',
                opacity: text === "Copied!" ? 0 : 1
            }}>
                Copy
            </span>
            <span style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 300ms',
                transform: text === "Copied!" ? 'translateY(0)' : 'translateY(100%)',
                opacity: text === "Copied!" ? 1 : 0
            }}>
                Copied!
            </span>
        </span>
    </Button>
  )
}

export default CopyButton