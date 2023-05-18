import * as React from 'react';
import './style.css';

export default function App() {
  const [passcode, setPasscode] = React.useState('');

  const onEnter = () => console.log('Passcode:', passcode);

  const ref = React.useRef(onEnter);

  React.useEffect(() => {
    ref.current = onEnter;
  }, [passcode]);

  const memoized = React.useMemo(() => {
    return () => {
      ref.current?.();
    };
  }, []);

  useTimeout(memoized, 5000);

  return (
    <div>
      <input
        type="text"
        value={passcode}
        onChange={(event) => setPasscode(event.target.value)}
      />

      <button onClick={onEnter}>Submit</button>
    </div>
  );
}

const useTimeout = (fn, delay) => {
  React.useEffect(() => {
    setTimeout(fn, delay);
  }, [fn, delay]);
};
