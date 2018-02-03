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

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: `/power_data/`,
      success: function(data) {
        this.setState({ data: data, loading: false });
      }.bind(this),
      error: function(data) {
        return data;
      }
    });
  }

  render() {
    if (this.state.loading == true) {
      return (
        <div>
          <h1> LOADING </h1>
        </div>
      );
    } else {
      let parsedData = this.state.data.data;

      let realParsed = [];
      parsedData.forEach(bill => {
        let newObj = {
          id: bill.id,
          buildingId: bill.relationships.building.data.id,
          meterId: bill.relationships.meter.data.id,
          peak: bill.attributes.peak,
          closing: bill.attributes.closing,
          initial: bill.attributes.initial,
          cost: bill.attributes.cost,
          used: bill.attributes.used
        };

        realParsed.push(newObj);
        newObj = {};
      });

      return (
        <div>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
          />
          <BootstrapTable
            ref="table"
            data={realParsed}
            remote={this.remote}
            pagination
          >
            <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>
              Id
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="buildingId"
              dataSort={true}
              filter={{
                type: "NumberFilter",
                delay: 300,
                numberComparators: ["=", ">", "<="]
              }}
            >
              Building Id
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="meterId"
              dataSort={true}
              filter={{
                type: "NumberFilter",
                delay: 300,
                numberComparators: ["=", ">", "<="]
              }}
            >
              Meter Id
            </TableHeaderColumn>
            <TableHeaderColumn dataField="initial" dataSort={true}>
              Initial Date
            </TableHeaderColumn>
            <TableHeaderColumn dataField="closing" dataSort={true}>
              Closing Date
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="cost"
              dataSort={true}
              filter={{
                type: "NumberFilter",
                delay: 300,
                numberComparators: ["=", ">", "<="]
              }}
            >
              Cost (USD)
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="peak"
              dataSort={true}
              filter={{
                type: "NumberFilter",
                delay: 300,
                numberComparators: ["=", ">", "<="]
              }}
            >
              Peak (kW)
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="used"
              dataSort={true}
              filter={{
                type: "NumberFilter",
                delay: 300,
                numberComparators: ["=", ">", "<="]
              }}
            >
              Used (kwH)
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
}

export default Power;
