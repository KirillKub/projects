"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requestItem;

async function requestItem(query) {
  const url = query;

  try {
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  } catch (err) {
    return err;
  }
}