import React from "react";
import { Typography } from "@material-ui/core";

export default function TitleHeader(props) {
  return (
    <div style={{ textAlign: "center", textTransform: "capitalize" }}>
      <Typography variant="h6">{props.title}</Typography>
    </div>
  );
}
