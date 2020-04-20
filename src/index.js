import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  joke = null;

  constructor() {
    super();

    this.state = {
      joke: null
    };

    this.onTellJoke = this.onTellJoke.bind(this);
  }

  onTellJoke() {
    console.log("click");
    fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ joke: json.joke });
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.onTellJoke}> Tell me a joke </button>
        <p>{this.state.joke}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App version="2.0" />, rootElement);

/*
//functional component, activate with
//return <Add a={3} b{5}/>;
const Add = props => <h1>{props.a + props.b}</h1>;

// this is a class component activate with
// return <Sub a={10} b{5}/>;
class Sub extends React.Component {
  render() {
    return <h1>{this.props.a - this.props.b}</h1>;
  }
}
/*this is a layout component
this is activated with is a wrapper, this is activated with 
    <div>
      <Layout>
        <p>more body content</p>
      </Layout>

      <br />
      <br />
      <Layout>
        <p>page 1 countains whatever</p>
      </Layout>
    </div>

const Layout = props => (
  <React.Fragment>
    <header>My Header</header>
    <main>{props.children}</main>
    <footer>My Footer</footer>
  </React.Fragment>
);
*/
