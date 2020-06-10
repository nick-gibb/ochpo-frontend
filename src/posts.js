import React from "react";
import ThemeCard from "./themeCard";
import PostCard from "./postCard";

export default function Posts(props) {
  const { items } = props;
  if (JSON.stringify(items) === "{}") {
    return "Loading...";
  }
  let cardFormat;
  if (props.cardType === "post") {
    cardFormat = items.map((item) => (
      <PostCard key={item.id} cardInfo={item} />
    ));
  } else {
    cardFormat = items.map((item) => (
      <ThemeCard key={item.name_id} cardInfo={item} />
    ));
  }

  return <React.Fragment>{cardFormat}</React.Fragment>;
}
