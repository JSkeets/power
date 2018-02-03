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
          initial: bill.attributes.inital,
          cost: bill.attributes.cost,
          used: bill.attributes.used
        };

        realParsed.push(newObj);
        newObj = {};
      });
      debugger;
      return (
        <div>
          <BootstrapTable
            ref="table"
            data={realParsed}
            remote={this.remote}
            pagination
          >
            <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>
              id
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
            <TableHeaderColumn
              dataField="peak"
              dataSort={true}
              filter={{
                type: "NumberFilter",
                delay: 300,
                numberComparators: ["=", ">", "<="]
              }}
            >
              Peak
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="closing"
              dataSort={true}
              filter={{
                type: "NumberFilter",
                delay: 300,
                numberComparators: ["=", ">", "<="]
              }}
            >
              Closing
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
}

// let order = "desc";
// class Watchlist extends React.Component {
//   constructor(props) {
//     super(props);
//     // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/

//     this.handleBtnClick = this.handleBtnClick.bind(this);
//     this.colFormatter = this.colFormatter.bind(this);
//     this.percentFormatter = this.percentFormatter.bind(this);
//     this.floatFormatter = this.floatFormatter.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.update = this.update.bind(this);
//     this.cellButton = this.cellButton.bind(this);
//     this.doBoth = this.doBoth.bind(this);
//   }

//   colFormatter(cell, row) {
//     return <Link to={`stocks/${cell}`}>{cell}</Link>;
//   }

//   handleBtnClick() {
//     if (order === "desc") {
//       this.refs.table.handleSort("asc", "name");
//       order = "asc";
//     } else {
//       this.refs.table.handleSort("desc", "name");
//       order = "desc";
//     }
//   }

//   percentFormatter(cell, row) {
//     if (cell > 0) {
//       return `<i id='percentPositive'>${cell.toFixed(2)}</i> `;
//     } else if (cell < 0) {
//       return `<i id='percentNegative'>${cell.toFixed(2)}</i> `;
//     } else {
//       return 0;
//     }
//     // return cell;
//   }

//   floatFormatter(cell, row) {
//     if (cell < 200) {
//       return `<i id='floatLow'>${cell}</i> `;
//     } else if (cell > 200 && cell < 100000) {
//       return `<i id='floatMid'>${cell}</i> `;
//     } else if (cell > 100000) {
//       return `<i id='floatHigh'>${cell}</i> `;
//     } else {
//       return 0;
//     }
//   }

//   update(field) {
//     return e =>
//       this.setState({
//         [field]: e.currentTarget.value
//       });
//   }

//   handleSubmit(e) {
//     let copy = this.state.watchlist.slice();
//     copy.push(this.state.ticker);
//     this.setState({
//       watchlist: copy
//     });
//     e.preventDefault();
//     const ticker = {
//       ticker: this.state.ticker,
//       userId: this.state.user
//     };
//     this.props.processForm(ticker);
//     window.location.reload();
//   }

//   onClickProductSelected(cell, row) {
//     let symbol = row.symbol;
//     let deleteObj = {
//       symbol: row.symbol,
//       id: this.state.user
//     };
//     this.props.deleteWatchlist(deleteObj);
//     let copy = this.state.watchlist.slice();
//     let index = copy.indexOf(symbol);
//     if (index > -1) {
//       copy.splice(index,1);
//     }
//     this.setState({
//       watchlist: copy
//     });
//     window.location.reload();

//   }

//   cellButton(cell, row, enumObject, rowIndex) {
//     return (
//       <button
//         type="button"
//         onClick={() => this.onClickProductSelected(cell, row, rowIndex)}
//       >
//         Delete
//       </button>
//     );
//   }

//   render() {
//     const options = { noDataText: "Add a ticker symbol to your watchlist to begin!"};
//     if (this.state.loading ) {
//       return <div className="loader">Loading...</div>;
//     } else {
//       const cellEditProp = {
//         mode: "click"
//       };
//       const selectRow = {
//         mode: "checkbox",
//         cliclToSelct: true
//       };
//       let parsed = Object.values(this.state.stocks);
//       let realParsed = [];
//       parsed.forEach(stock => {
//         let newObj = {
//           symbol: stock.quote.symbol,
//           changePercent: stock.quote.changePercent,
//           float: stock.stats.float,
//           price: stock.quote.latestPrice,
//           volume: stock.quote.latestVolume
//         };
//         realParsed.push(newObj);
//         newObj = {};
//       });
//       return (
//         <div>
//           <link
//             rel="stylesheet"
//             href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"
//           />
//           <link
//             rel="stylesheet"
//             href="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
//           />
//           <form onSubmit={this.handleSubmit} className="new-watchlist-item">
//             <input
//               className="new-watchlist-item-input"
//               type="text"
//               placeholder="new watchlist item"
//               value={this.state.ticker}
//               onChange={this.update("ticker")}
//             />

//             <input className="btn-primary" id="new-item-btn" type="submit" value="Add Ticker Symbol"/>
//           </form>
// <BootstrapTable
//   ref="table"
//   data={realParsed}
//   options={options}
//   remote={this.remote}
//   pagination
//   options={options}
// >
//   <TableHeaderColumn
//     dataField="symbol"
//     isKey={true}
//     dataSort={true}
//     dataFormat={this.colFormatter}
//   >
//     Symbol
//   </TableHeaderColumn>
//   <TableHeaderColumn dataField="price" dataSort={true}
//   filter={ {
//       type: 'NumberFilter',
//       delay: 300,
//       numberComparators: [ '=', '>', '<=' ]
// } }>
//     Price
//   </TableHeaderColumn>
//   <TableHeaderColumn dataField="volume" dataSort={true}
//   filter={ {
//       type: 'NumberFilter',
//       delay: 300,
//       numberComparators: [ '=', '>', '<=' ]
// } }>
//     Volume
//   </TableHeaderColumn>
//   <TableHeaderColumn
//     dataField="changePercent"
//     dataSort={true}
//     dataFormat={this.percentFormatter}
//     filter={ {
//       type: 'NumberFilter',
//       delay: 300,
//       numberComparators: [ '=', '>', '<=' ]
// } }
//   >
//     Percent Change
//   </TableHeaderColumn>
//   <TableHeaderColumn
//     dataField="float"
//     dataSort={true}
//     dataFormat={this.floatFormatter}
//     filter={ {
//       type: 'NumberFilter',
//       delay: 300,
//       numberComparators: [ '=', '>', '<=' ]
// } }
//   >
//     Float
//   </TableHeaderColumn>
//   <TableHeaderColumn
//     width="5%"
//     dataField="button"
//     dataFormat={this.cellButton.bind(this)}
//   >
//     Delete
//   </TableHeaderColumn>
// </BootstrapTable>
//         </div>
//       );
//     }
//   }
// }

// export default Watchlist;

export default Power;
