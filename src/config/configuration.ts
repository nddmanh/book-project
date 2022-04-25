export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  db_uri: process.env.DATABASE_URI,
});
