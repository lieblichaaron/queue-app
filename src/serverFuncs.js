import axios from "axios";
import Cookie from "js-cookie";

const baseUrl = "http://localhost:5000";
const authOptions = {
  headers: { authorization: Cookie.get("easyQ") },
};

export const leaveLine = async (lineId, ticket) => {
  try {
    const response = await fetch(`${baseUrl}/line/remove-shopper/${lineId}`, {
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
    const response = await fetch(`${baseUrl}/line/${lineId}`);
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};

export const watchLineById = async (lineId) => {
  try {
    const response = await fetch(`${baseUrl}/line/watch/${lineId}`);
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};

export const addTicketToLine = async (lineId, shopper) => {
  try {
    const response = await fetch(`${baseUrl}/line/add-shopper/${lineId}`, {
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
    const response = await fetch(`${baseUrl}/line/`, {
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
    const res = await axios.put(baseUrl + "/owner/edit", form, authOptions);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (form) => {
  try {
    const res = await axios.put(baseUrl + "/owner/password", form, authOptions);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const loginOwner = async (ownerObject) => {
  const res = await axios({
    method: "post",
    url: baseUrl + "/owner/login",
    data: ownerObject,
  });
  return res;
};

export const signupOwner = async (ownerObject) => {
  const res = await axios({
    method: "post",
    url: baseUrl + "/owner",
    data: ownerObject,
  });
  return res;
};

export const serveNextCustomer = async (lineId) => {
  try {
    const res = await axios.put(
      baseUrl + "/line/served-one/" + lineId,
      authOptions
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const pauseQueue = async (lineId) => {
  try {
    const res = await axios.put(
      baseUrl + "/line/status/" + lineId,
      { isActive: false },
      authOptions
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const resumeQueue = async (lineId) => {
  try {
    const res = await axios.put(
      baseUrl + "/line/status/" + lineId,
      { isActive: true },
      authOptions
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
