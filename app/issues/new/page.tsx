'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-4 '>
        <TextField.Root >
            <TextField.Input placeholder='Title' />
        </TextField.Root>
        <TextArea placeholder="Add your content" />
        <Button> ADD </Button>
    </div>
  )
}
export default NewIssuePage