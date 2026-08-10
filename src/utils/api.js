import { handleServerResponse } from "./weatherApi.js";

const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

export function getItems() {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
}

export function addItem({ name, weather, link }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      weather,
      link,
    }),
  }).then(handleServerResponse);
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);
}
