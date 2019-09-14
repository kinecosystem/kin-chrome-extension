import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as style from './style.css';

ReactDOM.render(
  <div className={style.app}>
    React Starter
    <span role='img' aria-label='rocket ship'>
      🚀
    </span>
    <div className={style.sassyDiv}>Get Sassy!</div>
  </div>,
  document.getElementById('root')
);
