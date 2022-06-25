import styled from 'styled-components';

export const Input = styled('input')({
  backgroundColor: '#fff',
  border: 'none',
  padding: '5px 8px',
  borderRadius: 4,
  height: 35,
  flex: 1,

  transition: 'outline 100ms ease-in',

  '&:focus-visible': {
    outline: 'none',
  },

  '&:hover': {
    outline: '1px solid rgba(71, 75, 255, .63)',
  },

  '&:focus': {
    outline: '2px solid rgba(71, 75, 255, 1)',
  },
});

export const Button = styled('button')({
  backgroundColor: 'rgba(71, 75, 255, .63)',
  color: '#fff',
  fontWeight: 700,
  appearance: 'none',
  border: 'none',
  cursor: 'pointer',

  borderRadius: 4,

  padding: '12px 0',

  transition: 'outline 100ms ease-in',

  '&:hover': {
    outline: '2px solid rgba(71, 75, 255, .23)',
  },

  '&:active': {
    transform: 'translateY(-1px)',
    transition: 'transform 50ms ease-in-out',
  },
});
