'use client';

import Documents from '@/app/Documents';
import { Button } from '@radix-ui/themes'
import Link from 'next/link';

const GetIssuePage = () => {

    return (
        <div className="flex justify-start flex-col max-w-6xl w-full">
            <div>
            <Button mb="3"><Link href='/issues'> Back </Link></Button>
            </div>
            <div className='space-y-4'>
                <Documents />
            </div>
        </div>
    );
};

export default GetIssuePage;