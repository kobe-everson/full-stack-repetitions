module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "docker",
      database: "movies",
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
};
