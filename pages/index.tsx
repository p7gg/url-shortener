import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { useCopyToClipboard } from '@prodigy7kx/usehooks-ts';

import { Form } from '@/components/Home';
import { IconButton, Paper, Stack, Text } from '@/components/common';
import { CheckmarkIcon, ClipboardIcon } from '@/components/icons';
import { trpc } from '@/lib';

const Home: NextPage = () => {
  const [slug, setSlug] = useState('');
  const [url, setUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [origin, setOrigin] = useState('');

  const [, copy] = useCopyToClipboard();

  const checkSlug = trpc.useQuery(['slugCheck', { slug }], {
    enabled: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const createSlug = trpc.useMutation(['createSlug']);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsCopied(false);

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

  const handleCopyToClipboard = () => {
    setIsCopied(true);
    copy(`${origin}/${createSlug.data?.slug}`);
  };

  return (
    <Stack
      flexDirection="column"
      spacing={10}
      maxWidth={500}
      width="100%"
      style={{ zIndex: 1 }}
    >
      <Form
        {...{ slug, setSlug, url, setUrl, origin, onSubmit: handleSubmit }}
      />
      {checkSlug.data?.isUsed && (
        <Text color="#fff" fontWeight={700} textAlign="center">
          slug already used
        </Text>
      )}
      {createSlug.data && (
        <Paper py={2} px={3}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text color="#fff" fontWeight={600}>
              {`${origin}/${createSlug.data?.slug}`}
            </Text>

            <IconButton onClick={handleCopyToClipboard}>
              {isCopied ? (
                <CheckmarkIcon fill="green" />
              ) : (
                <ClipboardIcon fill="white" />
              )}
            </IconButton>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default Home;
