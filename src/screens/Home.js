import "./home.css";
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

// import LinearProgress from "@material-ui/core/LinearProgress";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";

// import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
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
    "&:hover": {
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
  const [activeCase, setactiveCase] = useState();
  const [confirmedCase, setConfirmedCase] = useState();
  const [deathCase, setDeathCase] = useState();
  const [recoveredCase, setRecoveredCase] = useState();
  // const [population, setpopulation] = useState();
  // const [vaccinated1, setVaccinated1] = useState();
  // const [vaccinated2, setVaccinated2] = useState();
  // var vaccine1 = (vaccinated1 / population) * 100;
  // var vaccine2 = (vaccinated2 / population) * 100;

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
              setConfirmedCase(data[key].total.confirmed);
              setDeathCase(data[key].total.deceased);
              setRecoveredCase(data[key].total.recovered);
              setactiveCase(
                data[key].total.confirmed -
                  (data[key].total.deceased + data[key].total.recovered)
              );
              // setpopulation(data[key].meta.population);
              // setVaccinated1(data[key].total.vaccinated1);
              // setVaccinated2(data[key].total.vaccinated2);
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
  console.log(rows)
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
              <div className="confirmed cases">
                <h3>CONFIRMED</h3>
                {confirmedCase ? (
                  <p>&uarr; {commaNumber(indiaData.delta.confirmed)}</p>
                ) : (
                  <p> </p>
                )}
                <h2>{commaNumber(confirmedCase)}</h2>
              </div>
            </Grid>
            <Grid item>
              <div className="active cases">
                <h3>ACTIVE</h3>
                <h2>{commaNumber(activeCase)}</h2>
              </div>
            </Grid>
            <Grid item>
              <div className="cases recovered">
                <h3>RECOVERED</h3>
                {recoveredCase ? (
                  <p>&uarr; {commaNumber(indiaData.delta.recovered)}</p>
                ) : (
                  <p> </p>
                )}
                <h2>{commaNumber(recoveredCase)}</h2>
              </div>
            </Grid>
            <Grid item>
              <div className="cases death">
                <h3>DEATH</h3>
                {deathCase ? (
                  <p>&uarr; {commaNumber(indiaData.delta.deceased)}</p>
                ) : (
                  <p> </p>
                )}
                <h2>{commaNumber(deathCase)}</h2>
              </div>
            </Grid>
            {/* <Grid item>
              <div className="cases vaccine">
                <h3>VACCINATED</h3>
                <h2>DOSE 1 {commaNumber(indiaData.total.vaccinated1)}</h2>
                <h2>DOSE 2 {commaNumber(indiaData.total.vaccinated2)}</h2>
              </div>
            </Grid> */}
          </Grid>
        </div>
      ) : (
        <h3>NO Data Found</h3>
      )}
      <br />

      {/* <div className="progress_bar">
        <br />
        <ProgressBar
          completed={vaccine2.toPrecision(3)}
          bgColor="rgb(62, 163, 226)"
          width="80%"
        />
        <br />
      </div>

      <div style={{flexGrow:"1"}}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Paper className={classes.paper}>Dose 1</Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <ProgressBar
                completed={vaccine1.toPrecision(3)}
                bgColor="rgb(62, 163, 226)"
                width="80%"
              />
            </Paper>
          </Grid>
          <Grid item xs={1}>
            <Paper className={classes.paper}>xs</Paper>
          </Grid>
        </Grid>
      </div> */}
      {/* <div style={{flexGrow:"1"}}>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress
              variant="determinate"
              color="primary"
              value={vaccine1.toPrecision(3)}
            />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">
              {vaccine1.toPrecision(3)}
            </Typography>
          </Box>
        </Box>
      </div> */}

      {/* <div style={{flexGrow:"1"}}>
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress
              variant="determinate"
              color="primary"
              value={vaccine2.toPrecision(3)}
            />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">
              {vaccine2.toPrecision(3)}
            </Typography>
          </Box>
        </Box>
      </div> */}




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
                Active
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
                  {commaNumber(row.data.total.confirmed-(row.data.total.recovered+row.data.total.deceased))}
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
                  {commaNumber(row.data.total.vaccinated1)} |{" "}
                  {commaNumber(row.data.total.vaccinated2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <footer>
        <h4>Stay Safe, Stay Home, Get Vaccinated</h4>
        <h5>
          Made with &#10084;&#65039; by
          <a
            href="https://github.com/Vishu54"
            style={{ padding: "4px", textDecoration: "none" }}
          >
            Vishwesh
          </a>
        </h5>
      </footer>
    </div>
  );
}

export default Home;
