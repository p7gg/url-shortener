import styled from 'styled-components';
import { compose, layout, space } from 'styled-system';
import type { LayoutProps, SpaceProps } from 'styled-system';

type PaperProps = LayoutProps & SpaceProps;

const Paper = styled('div')<PaperProps>(
  {
    backgroundColor: 'rgba(255,255,255,0.5)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 10,
  },
  compose(layout, space),
);

export default Paper;
