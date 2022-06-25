import styled from 'styled-components';
import { color, compose, typography } from 'styled-system';
import type { ColorProps, TypographyProps } from 'styled-system';

export type TextProps = TypographyProps & ColorProps & {};

const Text = styled('p')<TextProps>(
  {
    margin: 0,
  },
  compose(typography, color),
);

export default Text;
