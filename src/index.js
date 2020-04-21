import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  joke = null;

  constructor() {
    super();

    this.state = {
      searchTerm: "",
      jokes: [],
      isFetchingJoke: false
    };

    this.onTellJoke = this.onTellJoke.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  searchJokes() {
    this.setState({ isFetchingJoke: true });

    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        const jokes = json.results;
        console.log("jokes", jokes);
        this.setState({
          jokes,
          isFetchingJoke: false
        });
      });
  }

  onTellJoke() {
    this.searchJokes();
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.searchJokes();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <input
            type="text"
            placeholder="Enter search term..."
            onChange={this.onSearchChange}
          />
          <button>Search</button>
          <button
            onClick={this.onTellJoke}
            disabled={this.state.isFetchingJoke}
          >
            Tell me a joke
          </button>
        </form>
        <p>{this.state.jokes.toString()}</p>
        <p>search term: {this.state.searchTerm}</p>
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
