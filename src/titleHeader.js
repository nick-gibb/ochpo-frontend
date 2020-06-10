import React from "react";
import { Typography } from "@material-ui/core";

export default function TitleHeader(props) {
  return (
    <div style={{ textAlign: "center", marginTop: 50, textTransform: "capitalize" }}>
      <Typography variant="h3">{props.title}</Typography>
    </div>
  );
}
