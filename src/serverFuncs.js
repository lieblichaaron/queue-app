export const leaveLine = async (lineId, ticket) => {
  try {
    const response = await fetch(
      `http://localhost:5000/line/remove-shopper/${lineId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch {
    return "server down";
  }
};

export const getLineById = async (lineId) => {
  try {
    const response = await fetch(`http://localhost:5000/line/${lineId}`);
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};

export const addTicketToLine = async (lineId, shopper) => {
  try {
    const response = await fetch(
      `http://localhost:5000/line/add-shopper/${lineId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopper),
      }
    );
    const data = await response.json();
    return data;
  } catch {
    return "server down";
  }
};
