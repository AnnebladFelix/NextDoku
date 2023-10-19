'use client';

import "easymde/dist/easymde.min.css";
import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import {useForm, Controller} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createIssueSchema } from "@/app/validationSchemas";
import {z} from 'zod';
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';

type IssueForm =  z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('')

    return (
    <div 
    className='max-w-xl space-y-4 '>
        {error && <Callout.Root color='red' className=' mb-5 '>
            <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        <form 
        onSubmit={handleSubmit(async (data) => { 
            try {
            await axios.post('/api/issues', data)
            router.push('/issues')
            } catch (error) {
                setError('An unexpected error.')
                
            }
                
        })}>
            <TextField.Root >
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            {errors.title && <Text color='red'as='label'>{errors.title.message}</Text>}
            <Controller 
            name='description'
            control={control}
            render={({ field }) => <SimpleMDE placeholder="Add your content" {...field} />}
            />
            {errors.description && <Text color='red' as='label'>{errors.description.message}</Text>}
            <Button> ADD </Button>
        </form>
    </div>
  )
}
export default NewIssuePage