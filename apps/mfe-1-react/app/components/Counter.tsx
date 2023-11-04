import { memo, useEffect, useState } from 'react';

interface CounterProps {
  count: number;
  onCountChange: (count: number) => any;
}

export const Counter = memo(function (props: CounterProps) {
  const [count, setCount] = useState(props.count);

  useEffect(() => {
    setCount(props.count);
  }, [props.count])

  const onCountChange = (count: number) => {
    setCount(count);
    props.onCountChange(count);
  }

  return (
    <>
      <p>React counter: {count}</p>
      <div>
        <button onClick={() => onCountChange(count - 1)}>-</button>
        <button onClick={() => onCountChange(count + 1)}>+</button>
      </div>
    </>
  )
})
