import express from "express";
import cors from "cors";

const server = express();
server.use(cors());

const holidays = [
  { date: "1/1/2023", name: "Confraternização mundial" },
  { date: "1/3/2023", name: "Carnaval" },
  { date: "4/17/2023", name: "Páscoa" },
  { date: "4/21/2023", name: "Tiradentes" },
  { date: "5/1/2023", name: "Dia do trabalho" },
  { date: "6/16/2023", name: "Corpus Christi" },
  { date: "9/7/2023", name: "Independência do Brasil" },
  { date: "10/12/2023", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2023", name: "Finados" },
  { date: "11/15/2023", name: "Proclamação da República" },
  { date: "12/25/2023", name: "Natal" },
];

function getHolidaysByMonth(idMonth) {
  return holidays.filter((holiday) => {
    const holidayDateParts = holiday.date.split("/");
    const holidayMonth = parseInt(holidayDateParts[0]);
    return holidayMonth === idMonth;
  });
}

server.get("/holidays", (_, res) => {
  res.send(holidays);
});

server.get("/is-today-holiday", (_, res) => {
  const today = new Date().toLocaleDateString("en-us");

  const holiday = holidays.find((item) => item.date === today);

  if (holiday) {
    res.send(`Yes, today is ${holiday.name}`);
    return;
  }
  res.send("No, today is not holiday!");
});

server.get("/holidays/:idMonth", (req, res) => {
  const monthId = parseInt(req.params.idMonth);

  const holidaysInDesiredMonth = getHolidaysByMonth(monthId);

  if (holidaysInDesiredMonth.length === 0) {
    res.send("There aren't any holidays this month!");
  }

  res.send(holidaysInDesiredMonth);
});

server.listen(5000, () => {
  console.log("Server running at port 5000");
});
