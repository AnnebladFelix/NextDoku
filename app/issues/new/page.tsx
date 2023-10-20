'use client';

import "easymde/dist/easymde.min.css";
import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import {useForm, Controller, set} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createIssueSchema } from "@/app/validationSchemas";
import {z} from 'zod';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import ErrorMessage from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";

type IssueForm =  z.infer<typeof createIssueSchema>
    

const NewIssuePage = () => {
    const apiKey = process.env.tinyKey;
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    return (
    <div className=' space-y-4 '>
        {error && <Callout.Root color='red' className=' mb-5 '>
            <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
        <form 
        onSubmit={handleSubmit(async (data) => { 
            try {
            setLoading(true);
            await axios.post('/api/issues', data)
            router.push('/issues')
            } catch (error) {
                setLoading(false);
                setError('An unexpected error.')
            }
                
        })}>
            <TextField.Root className=' mt-5 ' >
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            <ErrorMessage>
                {errors.title?.message}
            </ErrorMessage>
            <Controller 
            name='description'
            control={control}
            render={({ field }) => <Editor apiKey={apiKey} {...field} />}
            />
            <ErrorMessage>
                {errors.description?.message}
            </ErrorMessage>
            <Button disabled={!setLoading} >
                 ADD {loading && <Spinner />} 
            </Button>
        </form>
    </div>
  )
}
export default NewIssuePage