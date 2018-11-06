function dateConverter(datetime) {
  const date = datetime.split("T")[0].split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = date[0];
  const month = months[parseInt(date[1])];
  const day = date[2];
  const time = `${month} ${day}, ${year}`;
  return time;
}

export default dateConverter;
