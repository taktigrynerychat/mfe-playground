import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: block;
  border-radius: 8px;
  border: 1px solid #adadad;
  padding: 0 8px 16px 8px;

  & > p {
    color: #001c91;
    position: relative;
    padding-bottom: 8px;
    font-weight: 600;

    &::before {
      content: '';
      position: absolute;
      display: block;
      height: 1px;
      width: calc(100% + 16px);
      bottom: 0;
      left: -8px;
      background: #adadad;
    }
  }
`

type PubSubFeatureProps = {
  pubSubService: PubSubService;
}
export function PubSubFeature({ pubSubService }: PubSubFeatureProps) {
  const [randomWord, setRandomWord] = useState('');

  useEffect(() => {
    const subId = pubSubService.subscribe('customEvent', ({randomWord}) => {
      setRandomWord(randomWord);
    })
    return () => {
      pubSubService.unsubscribe(subId);
    };
  })

  return (
    <StyledWrapper>
      <p>React Pub/Sub Feature (subscriber)</p>
      <span>Random word emitted by publisher: <b>{randomWord}</b></span>
    </StyledWrapper>
  )
}
