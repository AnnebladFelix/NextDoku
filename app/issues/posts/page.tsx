'use client';
import Documents from '@/app/Documents';
import { Button } from '@radix-ui/themes'
import Link from 'next/link';

const GetIssuePage = () => {

    return (
        <div>
            <Button><Link href='/issues'> Back </Link></Button>
            <div className='space-y-4'>
                <Documents />
            </div>
        </div>
    );
};

export default GetIssuePage;