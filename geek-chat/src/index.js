import React from 'react';
import ReactDOM from 'react-dom/client';
import { Test } from './components/test/test'
//pull request

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Test
      props1={1}
      props2='123'
      props3={false}
      props4={() => console.log('click')}
      props5={[1, 2, 3]}
      film={[
        { title: "one", year: 2020 },
        { title: "two", year: 2022 }
      ]}
    />

  </React.StrictMode>
);

