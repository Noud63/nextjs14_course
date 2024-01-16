"use client"
import React from "react";

const error = ({error}) => {
  return <main className="error">
    <h1>An error occured!</h1>
    <p>Failed to fetch meals data</p>
  </main>;
};

export default error;
