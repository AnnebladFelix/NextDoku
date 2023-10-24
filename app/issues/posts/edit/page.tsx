'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Spinner } from '@/app/components/Spinner';
import {z} from 'zod';
import { getIssueSchema } from '@/app/validationSchemas';
import { Callout } from '@radix-ui/themes'
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useSearchParams } from 'next/navigation'


type Issue =  z.infer<typeof getIssueSchema>

const GetOneIssuePage = () => {
    const apiKey = process.env.tinyKey;
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const [issue, setIssue] = useState<Issue | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    console.log('id',id);
    
    useEffect(() => {
        const fetchIssue = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/api/issues/${id}`);
                    setIssue(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Error fetching issue. Please try again later.');
                    setLoading(false);
                }
            } else {
                setError('Issue ID not provided in the URL.');
                setLoading(false);
            }
        };

        fetchIssue();
    }, [id]);

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
        <div className='space-y-4'>
            <div key={issue.id}>
                <h1 className='text-2xl font-bold'>{issue.title}</h1>
                <Editor
                    id="editor"
                    apiKey={apiKey}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={issue.description}
                    init={{
                        height: 500,
                        menubar: false,
                        toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        content_style:
                            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
                    }}
                />
            </div>
        </div>
    );
};

export default GetOneIssuePage;