import database from "infra/database.js";
const os = require("os");

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const pgVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = pgVersion.rows[0].server_version;

  const pgConnCount = await database.query(
    "SELECT count(*) FROM pg_stat_activity;",
  );
  const databaseCurrenConnectionsValue = pgConnCount.rows[0].count;

  const systemUptime = os.uptime();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        currntConnections: databaseCurrenConnectionsValue,
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
