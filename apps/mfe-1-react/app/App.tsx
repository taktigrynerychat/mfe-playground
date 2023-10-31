import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const StyledH1 = styled.h1`
  color: red;
`
interface Props {
  name: string;
}
export function App({name}: Props) {
  const [count, setCount] = useState(0);
  return (
    <>
      <StyledH1>Hello {name} from mfe-1-react!</StyledH1>
      <button onClick={() => setCount(count+1) }>increase</button>
      <p>{count}</p>
    </>
  )
}
