import React from "react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// Components

class Power extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: "",
      errors: false
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1> HELLO </h1>
      </div>
    );
  }
}

export default Power;
