// graphql.config.js
module.exports = {
  schema: process.env.NEXT_PUBLIC_API_URL,
  documents: ['**/*.{graphql,js,ts,jsx,tsx}']
}
