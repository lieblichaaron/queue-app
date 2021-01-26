const baseLineUrl = "http://localhost:5000/line";
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
