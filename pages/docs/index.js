// pages/docs/index.js
export async function getStaticProps(context) {
  const swaggerSpecification = swaggerJsdoc({
    // Your configuration here
  });

  return {
    props: { swaggerSpecification }, // will be passed to the page component as props
  };
}