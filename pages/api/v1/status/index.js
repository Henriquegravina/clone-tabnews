import database from "infra/database.js";
const os = require("os");

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // PG version
  const pgVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = pgVersion.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;

  console.log(`Banco de dados: ${databaseName}`);
  //Opened Connections
  // count()
  // ::int
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int from pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  // Max Conections
  const databaseMaxConnectionsResult = await database.query(
    "SELECT current_setting('max_connections');",
  );

  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].current_setting;

  // System Uptime
  const systemUptime = os.uptime();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: parseInt(databaseOpenedConnectionsValue),
      },
    },
    system: {
      uptime: systemUptime,
    },
    process: {
      uptime: process.uptime(),
    },
  });
}

export default status;
