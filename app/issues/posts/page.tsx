'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@/app/components/Spinner';
import {z} from 'zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { Callout } from '@radix-ui/themes'


type Issue =  z.infer<typeof createIssueSchema>

const GetIssuePage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('/api/issues');
                setIssues(response.data); // Assuming the response contains the list of issues
                setLoading(false);
                console.log(response.data);
                
                
            } catch (error) {
                setError('Error fetching issues. Please try again later.');
                setLoading(false);
            }
        };

        fetchIssues();
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    if (loading) {
        return <Spinner />; // Display a loading spinner while fetching data
    }

    if (error) {
        return (
            <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
        );
    }

    // Render your fetched issues here, for example:
    return (
        <div className='space-y-4'>
            {issues.map((issue) => (
                <div key={issue.title}>
                    <p>{issue.title}</p>
                    {/* Render individual issue components */}
                </div>
            ))}
        </div>
    );
};

export default GetIssuePage;