import React from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";

import {
  Form,
  FormGroup,
  FormControl,
  Glyphicon,
  InputGroup,
  Button,
  Col
} from "react-bootstrap";

const formStyle = () => {
  return {
    marginTop: "10%"
  };
};
const paperStyle = () => {
  return {
    width: "100%",
    minWidth: 1200,
    overflowX: "auto"
  };
};
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 13
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: [],
      tablesize: 0,
      rowsPerPage: 5,
      page: 0,
      searchField: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.createTable = this.createTable.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleChangeRowsPerPagee = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const field = this.state.searchField;
    let request;

    if (field && field !== "") {
      request = "http://localhost:8090/invoice/contract/" + field;
    } else {
      // request = "http://localhost:8090/document/";
    }

    axios
      .get(request)
      .then(Response => this.handleResult(Response))
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  handleResult = response => {
    const tableData = response.data;
    console.log(tableData);
    const size = Object.keys(tableData).length;
    this.setState({ document: tableData, tablesize: size });
  };
  handleSearchFieldChange = e => {
    this.setState({ searchField: e.target.value });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  createTable = () => {
    const tablesize = this.state.tablesize;
    const page = this.state.page;
    const rowsPerPage = this.state.rowsPerPage;

    if (tablesize > 0) {
      return (
        <Card style={paperStyle()} raised={true}>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Sales Organization Name</CustomTableCell>
                  <CustomTableCell>Project Code</CustomTableCell>
                  <CustomTableCell>Fiscal year/period</CustomTableCell>
                  <CustomTableCell>@version</CustomTableCell>
                  <CustomTableCell>Ship-To Party Name</CustomTableCell>
                  <CustomTableCell>Material Name</CustomTableCell>
                  <CustomTableCell>Payer</CustomTableCell>
                  <CustomTableCell>Ship-To Party</CustomTableCell>
                  <CustomTableCell>ElasticsearchIndexName</CustomTableCell>
                  <CustomTableCell>Quantity</CustomTableCell>
                  <CustomTableCell>Discount</CustomTableCell>
                  <CustomTableCell>Material</CustomTableCell>
                  <CustomTableCell>Prod.hierarchy Name</CustomTableCell>
                  <CustomTableCell>Sales unit</CustomTableCell>
                  <CustomTableCell>Currency</CustomTableCell>
                  <CustomTableCell>Gross Value</CustomTableCell>
                  <CustomTableCell>Contract Name</CustomTableCell>
                  <CustomTableCell>Bill-to party Name</CustomTableCell>
                  <CustomTableCell>@timestamp</CustomTableCell>
                  <CustomTableCell>Payer Name</CustomTableCell>
                  <CustomTableCell>Bill-to party</CustomTableCell>
                  <CustomTableCell>Net Value</CustomTableCell>
                  <CustomTableCell>Billing Date</CustomTableCell>
                  <CustomTableCell>Prod.hierarchy</CustomTableCell>
                  <CustomTableCell>Contract</CustomTableCell>
                  <CustomTableCell>Sales Organization</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.document
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => {
                    return (
                      <TableRow>
                        <CustomTableCell>
                          {row.salesOrganizationName}
                        </CustomTableCell>
                        <CustomTableCell>{row.projectCode}</CustomTableCell>
                        <CustomTableCell>
                          {row.fiscalYearPeriod}
                        </CustomTableCell>
                        <CustomTableCell>{row.version}</CustomTableCell>
                        <CustomTableCell>{row.shipToParty}</CustomTableCell>
                        <CustomTableCell>{row.materialName}</CustomTableCell>
                        <CustomTableCell>{row.payer}</CustomTableCell>
                        <CustomTableCell>{row.shipToPartyName}</CustomTableCell>
                        <CustomTableCell>
                          {row.elasticsearchIndexName}
                        </CustomTableCell>
                        <CustomTableCell>{row.quantity}</CustomTableCell>
                        <CustomTableCell>{row.discounts}</CustomTableCell>
                        <CustomTableCell>{row.material}</CustomTableCell>
                        <CustomTableCell>
                          {row.prodHierarchyName}
                        </CustomTableCell>
                        <CustomTableCell>{row.salesUnit}</CustomTableCell>
                        <CustomTableCell>{row.currency}</CustomTableCell>
                        <CustomTableCell>{row.grossValue}</CustomTableCell>
                        <CustomTableCell>{row.contractName}</CustomTableCell>
                        <CustomTableCell>{row.billToPartyName}</CustomTableCell>
                        <CustomTableCell>{row.timestamp}</CustomTableCell>
                        <CustomTableCell>{row.payerName}</CustomTableCell>
                        <CustomTableCell>{row.billToParty}</CustomTableCell>
                        <CustomTableCell>{row.netValue}</CustomTableCell>
                        <CustomTableCell>{row.billingDate}</CustomTableCell>
                        <CustomTableCell>{row.prodHierarchy}</CustomTableCell>
                        <CustomTableCell>{row.contract}</CustomTableCell>
                        <CustomTableCell>
                          {row.salesOrganization}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    component="div"
                    count={tablesize}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    backIconButtonProps={{
                      "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                      "aria-label": "Next Page"
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Card>
      );
    }
  };

  render() {
    return (
      <div>
        <Form style={formStyle()}>
          <FormGroup bsSize="large">
            <Col xs={6} xsOffset={3}>
              <InputGroup>
                <FormControl
                  type="number"
                  placeholder="Search by contract id ..."
                  style={{ textAlign: "center" }}
                  onChange={this.handleSearchFieldChange}
                />
                <InputGroup.Button>
                  <Button
                    bsStyle="default"
                    bsSize="large"
                    onClick={this.handleSubmit}
                  >
                    <Glyphicon glyph="search" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </Col>
            <Col style={{ marginTop: "5%" }} lg={10} lgOffset={1}>
              {this.createTable()}
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Search;
