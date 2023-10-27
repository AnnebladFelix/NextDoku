'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@/app/components/Spinner';
import {z} from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { Button, Callout, TextField } from '@radix-ui/themes'
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import ErrorMessage from '@/app/components/ErrorMessage';
import Link from 'next/link';

type Issue =  z.infer<typeof createIssueSchema>

const GetOneIssuePage = () => {
    const apiKey = process.env.tinyKey;
    const [issue, setIssue] = useState<Issue | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter();
    const [editorContent, setEditorContent] = useState('');
    const { control, register, handleSubmit, formState: { errors } } = useForm<Issue>({
        resolver: zodResolver(createIssueSchema), });
    const handleEditorChange = (content: string) => {
    setEditorContent(content);
    };
    
    useEffect(() => {
        const fetchIssue = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/api/issues/${id}`);
                    setIssue(response.data);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setError('Error fetching issue. Please try again later.');
                }
            } else {
                setError('Issue ID not provided in the URL.');
                setLoading(false);
            }
        };
        fetchIssue();
    }, [id]);

    const onSubmit = async (data: Issue) => {
        try {
          setLoading(true);
          const requestData = { ...data, description: editorContent };
          await axios.put(`/api/issues/`+id, requestData);
          router.push('/issues');
        } catch (error) {
          setLoading(false);
          setError('An unexpected error occurred.');
        }
    };
    
    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
        );
    }

    if (!issue) {
        return <div>No issue found with the provided ID.</div>;
    }
    
    return (
        <div className='flex justify-center'>
            <div key={issue.title} className='max-w-6xl w-full '>
                <div className="flex items-center">
                    <Button ><Link href='/issues/posts/'> Back </Link></Button>
                    <h1 className='text-2xl font-bold mt-3 ml-3 border-b'>Edit document</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField.Root className="mt-3">
                        <TextField.Input defaultValue={issue.title} {...register('title')} />
                    </TextField.Root>
                    <ErrorMessage>{errors.title?.message}</ErrorMessage>
                    <Controller
                    name="description"
                    control={control}
                    defaultValue={editorContent}
                    render={({ field }) => (
                        <TinyMCEEditor
                        id="FIXED_ID"
                        apiKey={apiKey}
                        value={field.value}
                        initialValue={issue.description}
                        onEditorChange={(content) => {
                            field.onChange(content);
                            handleEditorChange(content);
                        }}
                        init={{
                            height: 600,
                            plugins: " preview mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                            toolbar: "preview undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat"
                        }}/>
                    )}/>
                    <ErrorMessage>{errors.description?.message}</ErrorMessage>
                    <div className='mt-3'>
                        <Button mr="3" disabled={loading}>
                            ADD {loading && <Spinner />}
                        </Button>
                        <Button ><Link href='/issues/posts/'> Cancel </Link></Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GetOneIssuePage;