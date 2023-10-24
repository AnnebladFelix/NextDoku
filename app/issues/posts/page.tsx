'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Spinner } from '@/app/components/Spinner';
import {z} from 'zod';
import { getIssueSchema } from '@/app/validationSchemas';
import { Callout } from '@radix-ui/themes'
import Link from 'next/link';


type Issue =  z.infer<typeof getIssueSchema>

const GetIssuePage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

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
                    <Link href={`/issues/posts/`+issue.id}> {issue.title} </Link>
                </div>
            ))}
        </div>
    );
};

export default GetIssuePage;