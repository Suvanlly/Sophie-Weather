import React, { Fragment } from 'react';
import styled from 'styled-components';

const NotFoundWrapper = styled.p`
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  color: #ffffff;
  margin: 100px auto;
` 
const NotFound = () => {
  return (
    <Fragment>
      <NotFoundWrapper>😿Sorry, We couldn't find that city...</NotFoundWrapper>
    </Fragment>
  )
};

export default NotFound;