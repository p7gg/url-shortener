import type { NextPage } from 'next';
import { useState } from 'react';

import { useCopyToClipboard } from '@prodigy7kx/usehooks-ts';

import { Form } from '@/components/Home';
import { Paper, Stack, Text } from '@/components/common';
import { trpc } from '@/lib';

const Home: NextPage = () => {
  const [slug, setSlug] = useState('');
  const [url, setUrl] = useState('');

  const [, copy] = useCopyToClipboard();

  const checkSlug = trpc.useQuery(['slugCheck', { slug }], {
    enabled: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const createSlug = trpc.useMutation(['createSlug']);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await checkSlug.refetch();

      if (data?.isUsed) {
        setSlug('');
        return;
      }

      await createSlug.mutateAsync({ slug, url });

      setUrl('');
      setSlug('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      flexDirection="column"
      spacing={10}
      maxWidth={500}
      width="100%"
      style={{ zIndex: 1 }}
    >
      <Form {...{ slug, setSlug, url, setUrl, onSubmit: handleSubmit }} />
      {checkSlug.data?.isUsed && (
        <Text color="#fff" fontWeight={700} textAlign="center">
          slug already used
        </Text>
      )}
      {createSlug.data && (
        <Paper py={2} px={3}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text color="#fff" fontWeight={600}>
              {createSlug.data.url}
            </Text>

            <button onClick={() => copy(createSlug.data?.url as string)}>
              copy
            </button>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default Home;
