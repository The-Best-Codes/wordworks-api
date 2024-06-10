// pages/docs/index.js

import swaggerJsdoc from "swagger-jsdoc";
import React from "react";

export async function getStaticProps(context) {
  const swaggerSpecification = swaggerJsdoc({
    // Your configuration here
  });

  return {
    props: { swaggerSpecification }, // will be passed to the page component as props
  };
}

export default function Docs({ swaggerSpecification }) {
    return <div>{swaggerSpecification}</div>;
  }