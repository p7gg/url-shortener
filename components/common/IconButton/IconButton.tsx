import styled from 'styled-components';

const IconButton = styled('button')({
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 30,
  width: 30,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(71, 75, 255, .9)',

  transition: 'outline 100ms ease-in',
  outlineColor: 'rgba(71, 75, 255, .23)',

  '&:hover': {
    outline: '2px solid rgba(71, 75, 255, .23)',
  },

  '&:focus': { boxShadow: `0 0 0 2px rgba(71, 75, 255, .5)` },
});

export default IconButton;
