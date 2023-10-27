'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@/app/components/Spinner';
import {z} from 'zod';
import { getIssueSchema } from '@/app/validationSchemas';
import { Callout, Dialog, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import { Button } from '@radix-ui/themes'


type Issue =  z.infer<typeof getIssueSchema>

export default function Documents() {
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
        try {
            await axios.delete(`/api/issues/${issue.id}`);
            setIssues(prevIssues => prevIssues.filter(i => i.id !== issue.id));
        } catch (error) {
            setError('Error deleting issue. Please try again later.');
        }
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
            <div className='space-y-4'>
                {issues.slice().reverse().map((issue) => (
                    <div className='flex justify-between border-b p-1' key={issue.id}>
                        <button 
                        className='text-2xl font-bold' 
                        onClick={(e) => handleEdit(issue)}> 
                        {issue.title}
                        </button>
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <Button ml="3" color="red">Delete</Button>
                            </Dialog.Trigger>

                            <Dialog.Content style={{ maxWidth: 450 }}>
                                <Dialog.Title>Do you really want to delete {issue.title}?</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    You cant undo this efter document is deleted.
                                </Dialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                    Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button ml="3" color="red" onClick={(e) => handleDelete(issue)}>Delete</Button>
                                </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>
                    </div>
                ))}
            </div>
        </div>
    );
}
