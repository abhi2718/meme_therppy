import React from 'react';
import styled from 'styled-components/native';

const positionVariant = {
  top: 'marginTop',
  left: 'marginLeft',
  right: 'marginRight',
  bottom: 'marginBottom',
};

const getVariant = (position, size) => {
  const property = positionVariant[position];
  return `${property}:${size}px`;
};

const SpacerView = styled.View`
  ${({variant}) => variant};
`;

export const Spacer = ({position, size, children}) => {
  const variant = getVariant(position, size);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

// spacer compoent will be use for giving margin
// how to use spacer -> <Spacer postion="top|botton|left|right" size="10px|20px"> childComponent </Spacer>