'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@/app/components/Spinner';
import {z} from 'zod';
import { getIssueSchema } from '@/app/validationSchemas';
import { Button, Callout } from '@radix-ui/themes'


type Issue =  z.infer<typeof getIssueSchema>
export default function DisplayDocument() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [displayDescription, setDisplayDescription] = useState<number | null>(null);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('/api/issues');
                setIssues(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching issues. Please try again later.');
                setLoading(false);
            }
        }; fetchIssues();
    }, []); 

    const toggleDisplayDiscription = (index: number) => {
        setDisplayDescription(displayDescription === index ? null : index)
    }

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
    <div>
       <h1 className='text-2xl font-bold underline'>ALL DOCUMENTS</h1>
        <div className='space-y-4'>
            {issues.slice().reverse().map((issue, index) => (
                <div key={issue.id}>
                    <p className='text-2xl font-bold'> 
                        {issue.title}
                    </p>
                    <Button onClick={() => toggleDisplayDiscription(index)}>
                        {displayDescription  === index ? 'Hide document' : 'Preview document'}
                    </Button>
                    {displayDescription === index && (
                    <p dangerouslySetInnerHTML={{ __html: issue.description }}></p>
                    )}
                </div>
            ))}
        </div>
    </div>
);
}
