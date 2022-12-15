import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = ({ type }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { Id } = useParams();

  useEffect(() => {
    console.log(type, Id);
    if (Id) {
      setLoading(true);
      const query = searchQuery(Id);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [Id]);
  const ideaName = Id || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
