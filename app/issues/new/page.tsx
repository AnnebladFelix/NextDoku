'use client';

import { TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-4 '>
        <TextField.Root >
            <TextField.Input placeholder='Title' />
        </TextField.Root>
        <TextArea placeholder="Add your content" />
    </div>
  )
}
export default NewIssuePage