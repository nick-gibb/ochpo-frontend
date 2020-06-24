import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

import Plot from "react-plotly.js";
import Grid from "@material-ui/core/Grid";
import DataTable from "./datatable";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";

var mapdata = [
  {
    type: "scattergeo",
    mode: "markers+text",
    text: [
      "Montreal",
      "Toronto",
      "Vancouver",
      "Calgary",
      "Edmonton",
      "Ottawa",
      "Halifax",
      "Victoria",
      "Winnepeg",
      "Regina",
    ],
    lon: [
      -73.57,
      -79.24,
      -123.06,
      -114.1,
      -113.28,
      -75.43,
      -63.57,
      -123.21,
      -97.13,
      -104.6,
    ],
    lat: [45.5, 43.4, 49.13, 51.1, 53.34, 45.24, 44.64, 48.25, 49.89, 50.45],
    marker: {
      size: 7,
      color: [
        "#bebada",
        "#fdb462",
        "#fb8072",
        "#d9d9d9",
        "#bc80bd",
        "#b3de69",
        "#8dd3c7",
        "#80b1d3",
        "#fccde5",
        "#ffffb3",
      ],
      line: {
        width: 1,
      },
    },
    name: "Canadian cities",
    textposition: [
      "top right",
      "top left",
      "top center",
      "bottom right",
      "top right",
      "top left",
      "bottom right",
      "bottom left",
      "top right",
      "top right",
    ],
  },
];

var maplayout = {
  title: "Canadian cities",
  font: {
    family: "Droid Serif, serif",
    size: 6,
  },
  titlefont: {
    size: 16,
  },
  geo: {
    scope: "north america",
    resolution: 50,
    lonaxis: {
      range: [-130, -55],
    },
    lataxis: {
      range: [40, 70],
    },
    showrivers: true,
    rivercolor: "#fff",
    showlakes: true,
    lakecolor: "#fff",
    showland: true,
    landcolor: "#EAEAAE",
    countrycolor: "#d3d3d3",
    countrywidth: 1.5,
    subunitcolor: "#d3d3d3",
  },
};

let x2d = [];
let y2d = [];
for (let i = 0; i < 500; i++) {
  x2d[i] = Math.random();
  y2d[i] = Math.random() + 1;
}

const data2d = [
  {
    x: x2d,
    y: y2d,
    type: "histogram2d",
  },
];

var x1 = [];
var x2 = [];
for (var i = 1; i < 500; i++) {
  const k = Math.random();
  x1.push(Math.random() + 1);
  x2.push(Math.random() + 1.1);
}
var overlaidtrace1 = {
  x: x1,
  type: "histogram",
  opacity: 0.5,
  name: "Newfoundland",
  marker: {
    color: "green",
  },
};
var overlaidtrace2 = {
  x: x2,
  type: "histogram",
  opacity: 0.6,
  name: "Manitoba",
  marker: {
    color: "red",
  },
};

var trace1 = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  y: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  fill: "tozerox",
  fillcolor: "rgba(0,100,80,0.2)",
  line: { color: "transparent" },
  name: "Ontario",
  showlegend: false,
  type: "scatter",
};
var trace2 = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  y: [5.5, 3, 5.5, 8, 6, 3, 8, 5, 6, 5.5, 4.75, 5, 4, 7, 2, 4, 7, 4.4, 2, 4.5],
  fill: "tozerox",
  fillcolor: "rgba(0,176,246,0.2)",
  line: { color: "transparent" },
  name: "Saskatchewan",
  showlegend: false,
  type: "scatter",
};
var trace3 = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  y: [11, 9, 7, 5, 3, 1, 3, 5, 3, 1, -1, 1, 3, 1, -0.5, 1, 3, 5, 7, 9],
  fill: "tozerox",
  fillcolor: "rgba(231,107,243,0.2)",
  line: { color: "transparent" },
  name: "Ontario",
  showlegend: false,
  type: "scatter",
};
var trace4 = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  line: { color: "rgb(0,100,80)" },
  mode: "lines",
  name: "Ontario",
  type: "scatter",
};
var trace5 = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  y: [5, 2.5, 5, 7.5, 5, 2.5, 7.5, 4.5, 5.5, 5],
  line: { color: "rgb(0,176,246)" },
  mode: "lines",
  name: "Saskatchewan",
  type: "scatter",
};
var trace6 = {
  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  y: [10, 8, 6, 4, 2, 0, 2, 4, 2, 0],
  line: { color: "rgb(231,107,243)" },
  mode: "lines",
  name: "Quebec",
  type: "scatter",
};
var data = [trace1, trace2, trace3, trace4, trace5, trace6];
var layout = {
  paper_bgcolor: "rgb(255,255,255)",
  plot_bgcolor: "rgb(229,229,229)",
  xaxis: {
    gridcolor: "rgb(255,255,255)",
    range: [1, 10],
    showgrid: true,
    showline: false,
    showticklabels: true,
    tickcolor: "rgb(127,127,127)",
    ticks: "outside",
    zeroline: false,
  },
  yaxis: {
    gridcolor: "rgb(255,255,255)",
    showgrid: true,
    showline: false,
    showticklabels: true,
    tickcolor: "rgb(127,127,127)",
    ticks: "outside",
    zeroline: false,
  },
};

var gaugedata = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: 270,
    title: { text: "Lockdown Level" },
    type: "indicator",
    mode: "gauge+number",
  },
];

var gaugelayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

var bulletdata = [
  {
    type: "indicator",
    mode: "number+gauge+delta",
    value: 220,
    domain: { x: [0, 1], y: [0, 1] },
    title: { text: "<b>Cases</b>" },
    delta: { reference: 200 },
    gauge: {
      shape: "bullet",
      axis: { range: [null, 300] },
      threshold: {
        line: { color: "red", width: 2 },
        thickness: 0.75,
        value: 280,
      },
      steps: [
        { range: [0, 150], color: "lightgray" },
        { range: [150, 250], color: "gray" },
      ],
    },
  },
];

export default function Profile() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <Container maxWidth="xl" display="block">
      <Grid
        container
        justify="space-around"
        alignItems="center"
        style={{ minHeight: "90vh" }}
      >
        <Grid item xs={12}>
          <Box mt={3}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Dashboard
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Plot
            data={mapdata}
            layout={maplayout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Plot
            data={bulletdata}
            layout={{ width: 600, height: 250 }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Plot
            data={gaugedata}
            layout={gaugelayout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Plot
            data={data}
            layout={layout}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Plot
            data={data2d}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Plot
            data={[overlaidtrace1, overlaidtrace2]}
            layout={{ barmode: "overlay" }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Plot
            data={[
              {
                x: Array.from({ length: 40 }, () =>
                  Math.floor(Math.random() * 40)
                ),
                y: Array.from({ length: 40 }, () =>
                  Math.floor(Math.random() * 40)
                ),
                type: "scatter",
                mode: "markers",
                marker: { color: "blue" },
              },
              {
                x: Array.from({ length: 40 }, () =>
                  Math.floor(Math.random() * 40)
                ),
                y: Array.from({ length: 40 }, () =>
                  Math.floor(Math.random() * 40)
                ),
                type: "scatter",
                mode: "markers",
                marker: { color: "green" },
              },
            ]}
            layout={{
              title: "A Public Health Plot",
              autosize: true,
              showlegend: false,
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid key="datatable" item xs={12} md={6} lg={6}>
          <DataTable />
        </Grid>
      </Grid>
    </Container>
  );
}
