import axios from "axios";
import Cookie from "js-cookie";

const baseLineUrl = "http://localhost:5000/line";
const baseUrl = "http://localhost:5000";
export const leaveLine = async (lineId, ticket) => {
  try {
    const response = await fetch(`${baseLineUrl}/remove-shopper/${lineId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};

export const getLineById = async (lineId) => {
  try {
    const response = await fetch(`${baseLineUrl}/${lineId}`);
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};

export const watchLineById = async (lineId) => {
  try {
    const response = await fetch(`${baseLineUrl}/watch/${lineId}`);
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};

export const addTicketToLine = async (lineId, shopper) => {
  try {
    const response = await fetch(`${baseLineUrl}/add-shopper/${lineId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shopper),
    });
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};

export const addNewLine = async (line) => {
  try {
    const response = await fetch(baseLineUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(line),
    });
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};

export const getOwnerLines = async (userID) => {
  try {
    const res = await axios.get(baseUrl + "/owner/" + userID + "/lines");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateUserInfo = async (form) => {
  try {
    const res = await axios.put(baseUrl + "/owner/edit", form, {
      headers: { authorization: Cookie.get("easyQ") },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (form) => {
  try {
    const res = await axios.put(baseUrl + "/owner/password", form, {
      headers: { authorization: Cookie.get("easyQ") },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
