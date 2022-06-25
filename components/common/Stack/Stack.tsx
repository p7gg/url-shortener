import styled from 'styled-components';
import { compose, flexbox, layout } from 'styled-system';
import type { FlexboxProps, LayoutProps } from 'styled-system';

export type StackProps = FlexboxProps &
  LayoutProps & {
    spacing?: React.CSSProperties['gap'];
  };

const Stack = styled('div')<StackProps>(
  ({ spacing }) => ({
    display: 'flex',
    gap: spacing,
  }),
  compose(flexbox, layout),
);

export default Stack;
