'use client';

import "easymde/dist/easymde.min.css";
import { Button, TextField, Callout } from '@radix-ui/themes'
import {useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createIssueSchema } from "@/app/validationSchemas";
import {z} from 'zod';
import { Editor as TinyMCEEditor} from '@tinymce/tinymce-react';
import axios from 'axios';
import ErrorMessage from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";
import Link from "next/link";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const apiKey = process.env.tinyKey;
  const router = useRouter();
  const { control, register, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [editorContent, setEditorContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const onSubmit = async (data: IssueForm) => {
    try {
      setLoading(true);
      const requestData = { ...data, description: editorContent };
      await axios.post('/api/issues', requestData);
      router.push('/issues');
    } catch (error) {
      setLoading(false);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <Button><Link href='/issues'> Back </Link></Button>
      <div className="space-y-4">
        {error && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField.Root className="mt-5">
            <TextField.Input placeholder="Title" {...register('title')} />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
          name="description"
          control={control}
          defaultValue={editorContent}
          render={({ field }) => (
              <TinyMCEEditor
              id="FIXED_ID"
              apiKey={apiKey}
              value={field.value}
              onEditorChange={(content) => {
                  field.onChange(content);
                  handleEditorChange(content);
              }}/>
          )}/>
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={loading}>
            ADD {loading && <Spinner />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewIssuePage;