import React from "react";
import ReactDOM from "react-dom";
import SearchForm from "./SearchForm";
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

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  searchJokes(limit = 20) {
    this.setState({ isFetchingJoke: true });

    fetch(
      `https://icanhazdadjoke.com/search?term=${
        this.state.searchTerm
      }&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    )
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

  onSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  renderJokes() {
    return (
      <ul>
        {this.state.jokes.map(item => (
          <li key={item.id}>{item.joke}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Dad Joke Generator</h1>
        <SearchForm
          onFormSubmit={this.searchJokes}
          onSearchValueChange={this.onSearchChange}
          isSearching={this.state.isFetchingJokes}
          onSingleSearchClick={() => this.searchJokes(1)}
        />
        {this.state.isFetchingJokes
          ? "searching for joke..."
          : this.renderJokes()}
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
