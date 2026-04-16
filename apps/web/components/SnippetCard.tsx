import React from 'react'
import { Card, CardAction, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { dateFormatter } from '@/lib/utils'
import { EyeIcon, TrashIcon } from 'lucide-react'

const SnippetCard = ({ slug, title, language, expiresAt, createdAt, onDelete}: { slug: string, title: string, language: string, createdAt: string, expiresAt?: string, onDelete: () => void }) => {
  return (
   <Card className='w-full'>
    <CardHeader>
        <CardTitle className='flex gap-2 flex-col'>
            <h2 className='font-semibold text-xl'>{title}</h2>
            <div className='flex gap-2 items-center'>
                <Badge className='bg-[#EEEDFE] text-[#534AB7]'>{language.charAt(0).toUpperCase() + language.slice(1)}</Badge>
                <p className='text-xs text-muted-foreground'>{expiresAt ? dateFormatter(expiresAt) : "Never expires"}</p>
                <p className='text-xs text-muted-foreground'>{dateFormatter(createdAt)}</p>
            </div>
        </CardTitle>
        <CardAction>
            <div className='flex flex-col gap-2 items-center'> 
                    <Button 
                        variant="outline"
                        render={<a href={`/s/${slug}`} />}    
                    >
                        <EyeIcon />Show
                    </Button>
                <Button 
                    variant="destructive"
                    onClick={onDelete}
                >
                    <TrashIcon /> Delete
                </Button>
            </div>

        </CardAction>
    </CardHeader>
   </Card>
  )
}

export default SnippetCard