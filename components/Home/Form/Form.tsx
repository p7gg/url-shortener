import { Paper, Stack, Text } from '@/components/common';

import { Button, Input } from './Form.styles';

type FormProps = {
  slug: string;
  setSlug: (slug: string) => void;
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const Form: React.FC<FormProps> = ({
  slug,
  setSlug,
  url,
  setUrl,
  onSubmit,
}) => {
  const { origin } = window.location;

  return (
    <Paper p={30}>
      <form onSubmit={onSubmit}>
        <Stack flexDirection="column" spacing={24}>
          <Stack alignItems="center" spacing={16}>
            <Text color="#fff" fontWeight={600}>
              {origin}
            </Text>

            <Input
              required
              type="text"
              placeholder="slug"
              value={slug}
              onChange={(e) => setSlug(e.currentTarget.value)}
            />
          </Stack>

          <Stack alignItems="center" spacing={16}>
            <Text color="#fff" fontWeight={600}>
              Link
            </Text>

            <Input
              required
              type="url"
              placeholder="https://google.com"
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
            />
          </Stack>

          <Button type="submit">shorten</Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default Form;
