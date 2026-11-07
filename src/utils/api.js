import { handleServerResponse } from "./weatherApi.js";

const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};
function headersAuth() {
  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${getToken()}`,
  };
}

function getItems() {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
}

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headersAuth(),
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(handleServerResponse);
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headersAuth(),
  }).then(handleServerResponse);
}

function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
}

function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
}

function getToken() {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  return token;
}

function getUser() {
  return fetch(`${baseUrl}/users/me`, { headers: headersAuth() }).then(
    handleServerResponse,
  );
}

function editUser({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: headersAuth(),
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
}

function addCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: headersAuth(),
  }).then(handleServerResponse);
}

function removeCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: headersAuth(),
  }).then(handleServerResponse);
}

export default {
  getItems,
  addItem,
  deleteItem,
  signup,
  signin,
  getToken,
  getUser,
  editUser,
  addCardLike,
  removeCardLike,
};
