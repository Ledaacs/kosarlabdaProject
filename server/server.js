require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const sanitizeHtml = require("sanitize-html");

const pool = require("./config/database.js");
const {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
} = require("./config/sending.js");

//#region middlewares
app.use(express.json());
//#endregion middlewares

//#region basketball/players
app.get("/players", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM players";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/players/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = `
    SELECT * FROM players
    WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/players", (req, res) => {
  const newR = {
    id: +mySanitizeHtml(req.body.id),
    name: mySanitizeHtml(req.body.name),
    positionId: +mySanitizeHtml(req.body.positionId),
    teamId: +mySanitizeHtml(req.body.teamId)
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO players
      (id, name, positionId, teamId)
      VALUES
      (?, ?, ?, ?)
    `;
    connection.query(
      sql,
      [newR.id, newR.name, newR.positionId, newR.teamId],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

app.put("/players/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    id: +mySanitizeHtml(req.body.id),
    name: mySanitizeHtml(req.body.name),
    positionId: +mySanitizeHtml(req.body.positionId),
    teamId: +mySanitizeHtml(req.body.teamId)
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE players SET
    id = ?, 
    name = ?, 
    positionId = ?, 
    teamId = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.id, newR.name, newR.positionId, newR.teamId, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/players/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from players
    WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});
//#endregion basketball

function mySanitizeHtml(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
