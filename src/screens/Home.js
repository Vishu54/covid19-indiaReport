import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
const commaNumber = require("comma-number");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: "#DDE1E4",
    border: "5px solid #767B91",
  },
  tableData: {
    border: "2px solid #856084",
    '&:hover': {
      background: "#C7CCDB",
   },
  },
});

function Home() {
  const statesCode = {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CH: "Chandigarh",
    CT: "Chhattisgarh",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    LD: "Lakshadweep",
    LA: "Ladakh",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PY: "Puducherry",
    PB: "Punjab",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TG: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand",
    WB: "West Bengal",
  };
  const [rows, setrows] = useState([]);
  const [indiaData, setindiaData] = useState({});

  async function getData() {
    var temp = [];
    await axios
      .get("https://api.covid19india.org/v4/min/data.min.json")
      .then((res) => {
        const data = res.data;
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if (key !== "TT") {
              temp.push({
                key,
                data: data[key],
              });
            } else {
              setindiaData(data[key]);
            }
          }
        }
        setrows(temp);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();

  return (
    <div className="main_dashboard">
      {/* Dashboard */}
      <div className="heading">
        <div className="dashboard_heading">
          <h1>Mask Up India</h1>
          <h2>India's Recovery Report</h2>
        </div>
      </div>
      {Object.keys(indiaData).length > 0 ? (
        <div>
          <Grid container spacing={1} className="dashboard">
            <Grid item>
              <div className="active cases">
                <h3>CONFIRMED</h3>
                {indiaData.delta.confirmed ? (
                  <p>&uarr; {commaNumber(indiaData.delta.confirmed)}</p>
                ) : (
                  <p> </p>
                )}
                <h2>{commaNumber(indiaData.total.confirmed)}</h2>
              </div>
            </Grid>
            <Grid item>
              <div className="cases recovered">
                <h3>RECOVERED</h3>
                {indiaData.delta.recovered ? (
                  <p>&uarr; {commaNumber(indiaData.delta.recovered)}</p>
                ) : (
                  <p> </p>
                )}
                <h2>{commaNumber(indiaData.total.recovered)}</h2>
              </div>
            </Grid>
            <Grid item>
              <div className="cases death">
                <h3>DEATH</h3>
                {indiaData.delta.deceased ? (
                  <p>&uarr; {commaNumber(indiaData.delta.deceased)}</p>
                ) : (
                  <p> </p>
                )}
                <h2>{commaNumber(indiaData.total.deceased)}</h2>
              </div>
            </Grid>
            <Grid item>
              <div className="cases vaccine">
                <h3>VACCINATED</h3>
                <h2>{commaNumber(indiaData.total.vaccinated)}</h2>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <h3>NO Data Found</h3>
      )}

      {/* data according to states */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table_head" align="center">
                STATE/UT
              </TableCell>
              <TableCell align="center" className="table_head">
                Confirmed
              </TableCell>
              <TableCell align="center" className="table_head">
                Recovered
              </TableCell>
              <TableCell align="center" className="table_head">
                Death
              </TableCell>
              <TableCell align="center" className="table_head">
                Vaccinated
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key} className={classes.tableData}>
                <TableCell component="th" scope="row" align="left">
                  {statesCode[row.key]}
                </TableCell>
                <TableCell align="center">
                  {commaNumber(row.data.total.confirmed)}
                  {row.data.delta && row.data.delta.confirmed ? (
                    <span style={{ marginLeft: "10px", color: "red" }}>
                      &uarr;{commaNumber(row.data.delta.confirmed)}
                    </span>
                  ) : (
                    <div></div>
                  )}
                </TableCell>
                <TableCell align="center">
                  {commaNumber(row.data.total.recovered)}
                  {row.data.delta && row.data.delta.recovered ? (
                    <span style={{ marginLeft: "10px", color: "green" }}>
                      &uarr;{commaNumber(row.data.delta.recovered)}
                    </span>
                  ) : (
                    <div></div>
                  )}
                </TableCell>
                <TableCell align="center">
                  {commaNumber(row.data.total.deceased)}
                  {row.data.delta && row.data.delta.deceased ? (
                    <span style={{ marginLeft: "10px", color: "darkgrey" }}>
                      &uarr;{commaNumber(row.data.delta.deceased)}
                    </span>
                  ) : (
                    <div></div>
                  )}
                </TableCell>
                <TableCell align="center">
                  {commaNumber(row.data.total.vaccinated)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <footer>
        <h4>Stay Safe, Stay Home, Get Vaccinated</h4>
        <h5>Made with &#10084;&#65039; by<a href="https://github.com/Vishu54" style={{padding:"4px",textDecoration:"none"}}>Vishwesh</a></h5>
      </footer>
    </div>
  );
}

export default Home;
