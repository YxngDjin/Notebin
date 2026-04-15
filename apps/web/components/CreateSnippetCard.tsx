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



const CreateSnippetCard = () => {
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

            const response = await axios.post('http://localhost:3002/api/snippets', {
            ...values,
            expiresAt: expireDate?.toLocaleDateString("de-De")
        
        })

        setValues({
            title: '',
            content: '',
            language: '',
        })

        } catch (e) {
            console.log(e)
            // Handle Error With Toast
        }
    }

  return (
    <Card className='w-170'>
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
                            <SelectItem value='html'>HTML</SelectItem>
                            <SelectItem value='css'>CSS</SelectItem>
                            <SelectItem value='javascript'>JavaScript</SelectItem>
                            <SelectItem value='typescript'>TypeScript</SelectItem>
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
        <CardFooter>
            <Button variant='default' onClick={handleSubmit}>
                Save
            </Button>
            <Popover>
                <PopoverTrigger>
                    <Button
                        variant="outline"
                        data-empty={!expireDate}
                    >
                        {
                            expireDate
                                ? expireDate.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })
                                : "Expiration Date"
                        }
                    </Button>
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