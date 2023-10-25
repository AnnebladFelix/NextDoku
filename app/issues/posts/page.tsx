'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@/app/components/Spinner';
import {z} from 'zod';
import { getIssueSchema } from '@/app/validationSchemas';
import { Callout } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import { Button } from '@radix-ui/themes'
import Link from 'next/link'


type Issue =  z.infer<typeof getIssueSchema>

const GetIssuePage = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();



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

    const handleEdit = (issue: Issue) =>{
        router.push(`/issues/posts/edit/?id=`+ issue.id)
    }

    const handleDelete = async (issue: Issue) =>{
        const res = await fetch(`/api/issues/`+ issue.id)
        method: "DELETE"
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
            <Button><Link href='/issues'> Back </Link></Button>
            <div className='space-y-4'>
                {issues.map((issue) => (
                    <div key={issue.id}>
                        <button 
                        className='text-2xl font-bold' 
                        onClick={(e) => handleEdit(issue)}> 
                        {issue.title}
                        </button>
                        <button onClick={(e) => handleDelete(issue)}> Delete </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetIssuePage;