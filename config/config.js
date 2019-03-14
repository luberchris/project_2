module.exports = {
  development: {
    username: "o26hjgg4qohcnhea",
    password: "k1bvof53qjjwk3m7",
    database: "qnzrky2vg4n4sjmn",
    host: "op2hpcwcbxb1t4z9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "Hamill09",
    database: "database_test",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    use_env_variable: process.env.JAWSDB_URL,
    dialect: "mysql"
  }
};
