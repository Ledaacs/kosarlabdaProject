const { response } = require("express");

class Response {
  constructor(success = 0, message = "", data = []) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

function sendingGet(res, error, results) {
  if (error) {
    console.log(error);
    const response = new Response(0, "sql error", []);
    res.send(response);
    return;
  }
  const response = new Response(1, "ok", results);
  res.send(response);
}

function sendingGetError(res, message) {
  const response = new Response(0, message, []);
  res.send(response);
  return;
}

function sendingGetById(res, error, results, id) {
  if (error) {
    const response = new Response(0, "sql error", []);
    res.send(response);
    return;
  }
  if (results.length == 0) {
    const response = new Response(0, `Not found id: ${id}`, []);
    res.send(response);
    return;
  }
  const response = new Response(1, "ok", results);
  res.send(response);
}

function sendingPost(res, error, result, newR) {
  if (error) {
    const response = new Response(0, "sql error", []);
    res.send(response);
    return;
  }
  if (!result.affectedRows) {
    const response = new Response(0, "Insert falied", []);
    res.send(response);
    return;
  }
  newR.id = result.insertId;
  const response = new Response(1, "ok", newR);
  res.send(response);
}

function sendingPut(res, error, result, id, newR) {
  if (error) {
    const response = new Response(0, "sql error", []);
    console.log(error);
    res.send(response);
    return;
  }
  if (!result.affectedRows) {
    const response = new Response(0, "Put falied", []);
    res.send(response);
    return;
  }
  newR.id = id;
  const response = new Response(1, "ok", newR);
  res.send(response);
}

function sendingDelete(res, error, result, id) {
  if (error) {
    const response = new Response(0, "sql error", []);
    res.send(response);
    return;
  }
  if (!result.affectedRows) {
    const response = new Response(0, `Not found id: ${id}`, []);
    res.send(response);
    return;
  }
  const response = new Response(1, "ok", { id: id });
  res.send(response);
}

function sendingInfo(res, success, message, data, status) {
  if (status) {
    res.status(status);
  }
  const response = new Response(success, message, data);
  res.send(response);
}

module.exports = {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
};
