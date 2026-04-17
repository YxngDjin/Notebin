import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { dateFormatter } from '@/lib/utils'
import { EyeIcon, TrashIcon } from 'lucide-react'

const SnippetCard = ({ slug, title, language, expiresAt, createdAt, onDelete}: { slug: string, title: string, language: string, createdAt: string, expiresAt?: string, onDelete: () => void }) => {
  return (
   <Card className='w-full'>
    <CardHeader className='flex justify-between items-center'>
        <CardTitle className='flex gap-2 flex-col'>
            <h2 className='font-semibold text-xl'>{title}</h2>
            <div className='flex gap-2 items-center'>
                <Badge className='bg-[#EEEDFE] text-[#534AB7]'>{language.charAt(0).toUpperCase() + language.slice(1)}</Badge>
                <p className='text-xs text-muted-foreground'>{expiresAt ? dateFormatter(expiresAt) : "Never expires"}</p>
                <p className='text-xs text-muted-foreground'>{dateFormatter(createdAt)}</p>
            </div>
        </CardTitle>
        <div>
            <div className='flex gap-2 items-center'> 
                <Link href={`/s/${slug}`} >
                    <Button
                        variant="outline"    
                    >
                        <EyeIcon />Show
                    </Button>
                </Link>
                <Button 
                    variant="destructive"
                    onClick={onDelete}
                >
                    <TrashIcon /> Delete
                </Button>
            </div>
        </div>
    </CardHeader>
   </Card>
  )
}

export default SnippetCard