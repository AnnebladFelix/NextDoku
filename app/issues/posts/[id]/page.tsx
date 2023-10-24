'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Spinner } from '@/app/components/Spinner';
import {z} from 'zod';
import { getIssueSchema } from '@/app/validationSchemas';
import { Callout } from '@radix-ui/themes'
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useParams } from 'next/navigation';


type Issue =  z.infer<typeof getIssueSchema>

const GetOneIssuePage = () => {
    const apiKey = process.env.tinyKey;
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            const paramId = useParams
            console.log('param',paramId);
            
            try {
                const response = await axios.get(`/api/issues/${paramId}`);
                console.log(response);
                
                setIssues(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching issues. Please try again later.');
                setLoading(false);
            }
        };

        fetchIssues();
    }, []); 

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

    return (
        <div className='space-y-4'>
            {issues.map((issue) => (
                <div key={issue.id}>
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
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                />
                </div>
            ))}
        </div>
    );
};

export default GetOneIssuePage;