const todayDate = () => {
  const dateTime = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
    .split(", ");

  const mdy = dateTime[0].split("/");
  const time = dateTime[1];

  return {
    date: `${mdy[2]}-${mdy[0]}-${mdy[1]}`,
    time,
  };
};

module.exports = todayDate;
