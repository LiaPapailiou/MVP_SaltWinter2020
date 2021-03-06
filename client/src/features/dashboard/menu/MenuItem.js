import React from 'react';
import styled from 'styled-components';

import { Button } from 'antd';

const MenuItem = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 240px;
  height: 50px;
  background-color: ${props => props.theme.colors.background.dark};
  font-size: ${props => props.theme.fonts.caption};
  color: ${props => props.theme.colors.background.light};
  padding-left: 26px;
  border-radius: 0px;
  border: 0px;

  &:active {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    width: 240px;
    height: 50px;
    background-color: ${props => props.theme.colors.background.link};
    font-size: ${props => props.theme.fonts.caption};
    color: ${props => props.theme.colors.background.light};
    border-left: 4px solid ${props => props.theme.colors.link.tertiary};
    padding-left: 24px;
    border-radius: 0px;
  }
  &:hover {
    background-color: ${props => props.theme.colors.background.link};
    font-size: ${props => props.theme.fonts.caption};
    color: ${props => props.theme.colors.link.tertiary};
    border-left: 4px solid ${props => props.theme.colors.link.tertiary};
    padding-left: 24px;
    border-radius: 0px;
  }
  &:focus {
    background-color: ${props => props.theme.colors.background.link};
    font-size: ${props => props.theme.fonts.caption};
    color: ${props => props.theme.colors.link.tertiary};
    border-left: 4px solid ${props => props.theme.colors.link.tertiary};
    padding-left: 24px;
    border-radius: 0px;
    }
`

function DefaultButton({ icon, children }) {
  return (
    <div>
      <MenuItem
        icon={icon}>
        {children}
      </MenuItem>
    </div>
  );
}

export default DefaultButton;
