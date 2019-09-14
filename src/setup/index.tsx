import * as React from 'react';
import * as ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  public closeWindow() {
    chrome.cookies.getAll({ name: 'kin_ext_install_source' }, cookies => {
      window.open(cookies[0].value);
      window.close();
    });
  }
  public render() {
    return (
      <div>
        <button onClick={this.closeWindow}>
          <h1>CLICK TO CLOSE</h1>
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
