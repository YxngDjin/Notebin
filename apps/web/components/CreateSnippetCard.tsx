"use client";

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectGroup, SelectItem } from './ui/select';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import axios from 'axios';
import { SUPPORTED_LANGUAGES } from '@/app/constants/languages';
import { toast } from 'sonner';



const CreateSnippetCard = ({ onSuccess }: { onSuccess?: () => void}) => {

    const [expireDate, setexpireDate] = useState<Date>();
    const [values, setValues] = useState({
        title: '',
        content: '',
        language: '',
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            if (!values.content || !values.title || !values.language)
                return;

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/snippets`, {
            ...values,
            expiresAt: expireDate?.toISOString()
        
        })

        setValues({
            title: '',
            content: '',
            language: '',
        })

        
        onSuccess?.()
        toast.success('Snippet Created', { position: "top-center"})


        } catch (e) {
            console.error(e)
            toast.error("Something went wrong", {
                description: "Please log in the Conole for more Information.",
                position: "top-center"
            })
        }
    }

  return (
    <Card className='mac-w-2xl'>
        <CardHeader>
            <CardTitle className='flex gap-3'>
                <Input
                    type='text'
                    placeholder='Title'
                    value={values.title}
                    onChange={handleChange}
                    name='title'
                />
                <Select onValueChange={(value) => setValues({ ...values, language: value as string })}>
                    <SelectTrigger>
                        <SelectValue placeholder='Language' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {SUPPORTED_LANGUAGES.map((language) => {
                                return (
                                    <SelectItem key={language.value} value={language.value}>
                                        {language.label}
                                    </SelectItem>
                                )
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardTitle>
            <CardDescription>
                Enter your Code Snippit here.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea required name='content' placeholder='Enter your Code here.' onChange={handleChange} value={values.content}/>
        </CardContent>
        <CardFooter className='felx gap-4'>
            <Button variant='default' onClick={handleSubmit}>
                Save
            </Button>
            <Popover>
                <PopoverTrigger className="border rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-secondary">
                    {expireDate
                        ? expireDate.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })
                        : "Expiration Date"
                    }
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode='single' selected={expireDate} onSelect={setexpireDate}/>
                </PopoverContent>
            </Popover>
        </CardFooter>
    </Card>
  )
}

export default CreateSnippetCard