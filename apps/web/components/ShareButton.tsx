"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { DownloadIcon } from "lucide-react";
import ImageDialog from "./ImageDialog";

const ShareButton = ({ code, language, title }: { code: string, language: string, title: string }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClose = () => {
        setIsOpen(false)
    }

  return (  
    <>
        <Button onClick={() => setIsOpen(!isOpen)}>
            <DownloadIcon /> Share
        </Button>

        {isOpen && (
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setIsOpen(false)}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <ImageDialog 
                        code={code}
                        title={title}
                        language={language}
                        onClose={() => onClose()}
                    />
                </div>
            </div>
        )}
    </>
  )
}

export default ShareButton