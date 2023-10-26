'use client';

import Documents from '@/app/Documents';
import { Button } from '@radix-ui/themes'
import Link from 'next/link';

const GetIssuePage = () => {

    return (
        <div className="flex justify-start flex-col max-w-6xl w-full">
            <div className='flex items-center mb-3'>
                <Button><Link href='/issues'> Back </Link></Button>
                <h1 className="text-2xl font-bold mt-3 ml-3 border-b">Edit documents</h1>
            </div>
            <div className='space-y-4'>
                <Documents />
            </div>
        </div>
    );
};

export default GetIssuePage;