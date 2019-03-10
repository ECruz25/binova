const mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const fs = require("fs");
const faker = require("faker");
const xlsx = require("xlsx");
const EmbeddedBi = mongoose.model("EmbeddedBI");

/* GET home page. */

router.get("/", function(req, res, next) {
  res.send("desde el server");
});

router.post("/bi/create", async (req, res) => {
  try {
    await EmbeddedBi.deleteMany();
    const embeddedBis = await new EmbeddedBi(req.body);
    await embeddedBis.save();
    console.log(embeddedBis);
    res.send(200);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

router.get("/api/bi", async (req, res) => {
  try {
    const embeddedBis = await EmbeddedBi.findOne();
    console.log(embeddedBis);
    res.send(embeddedBis);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

router.post("/uploadData", (req, res, next) => {
  try {
    const file = req.files.file;
    console.log(file);
    file.mv(`public/uploads/${file.name}`, error => {
      console.log(error);
    });
    res.send(200);
  } catch (error) {
    console.log(error);
  }

  const file = req.body.file;

  file.mv(`/uploads/${file.name}`, error => {
    console.log(error);
  });
  res.send(200);
});

router.get("/files", (req, res) => {
  try {
    const workbook = xlsx.readFile("public/DATA_VENTAS.xlsx");
    const sheets = workbook["SheetNames"];
    const data = sheets.map(sheet => workbook["Sheets"][sheet]);
    const lastCell = data[0]["!ref"].split(":")[1];
    const lastCellWithNoDigits = lastCell.replace(/[0-9]/g, "");
    const rows = lastCell.replace(/\D/g, "");

    const columns = [];
    const doesItHaveMargins = data["0"]["!margins"] ? 1 : 0;

    let columnAmount =
      (Object.keys(data["0"]).length - 1 - doesItHaveMargins) / rows;
    for (
      let x = Object.keys(data["0"])[0] === "!ref" ? 1 : 0;
      x < columnAmount + (Object.keys(data["0"])[0] === "!ref" ? 1 : 0);
      x++
    ) {
      const key = Object.keys(data["0"])[x];
      console.log(x, columnAmount);
      const type =
        data["0"][Object.keys(data["0"])[x + columnAmount]].t === "s"
          ? "string"
          : data["0"][Object.keys(data["0"])[x + columnAmount]].t === "d"
          ? "date"
          : "int";
      if (key !== "!ref") {
        columns.push({ key, columnName: data["0"][key].v, type });
      } else {
        columnAmount = columnAmount + 1;
      }
    }

    res.send(columns);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/createFake", () => {
  const rows = [
    "",
    "Nombre",
    "Apellido",
    "Fecha de Suscripcion",
    "Numero de telefono",
    "Correo Electronico",
    "Puesto de trabajo",
    "Nombre de Usuario",
    "Pais",
    "Ciudad",
    "Direccion",
    "Producto",
    "Precio"
  ];
  const rows2 = [];
  for (let x = 0; x < 20000; x++) {
    const customer = [
      "\n",
      faker.name.firstName(),
      faker.name.lastName(),
      faker.date.past(2),
      faker.phone.phoneNumber(),
      faker.internet.email(),
      faker.name.jobTitle(),
      faker.internet.userName(),
      faker.address.country(),
      faker.address.city(),
      faker.address.streetAddress(),
      faker.commerce.product(),
      faker.commerce.price()
    ];
    rows2.push(customer);
  }
  rows.push(rows2);
  fs.writeFile("public/DATA_VENTAS.xlsx", rows, err => {
    if (err) {
      console.log(err);
    }
    console.log("gooo");
  });
});

router.post("/getAmount", (req, res) => {
  const columns = Object.keys(req.body).filter(column => req.body[column]);

  const workbook = xlsx.readFile("public/DATA_VENTAS.xlsx");
  const sheets = workbook["SheetNames"];
  const data = sheets.map(sheet => workbook["Sheets"][sheet]);
  const lastCell = data[0]["!ref"].split(":")[1];
  const lastCellWithNoDigits = lastCell.replace(/[0-9]/g, "");
  const rows = lastCell.replace(/\D/g, "");
  const columnsWithNoDigits = columns.map(column =>
    column.replace(/[0-9]/g, "")
  );
  const data1 = columnsWithNoDigits.map(column => {
    const columnValues = {};
    columnValues[`${column}1`] = [];
    for (let x = 2; x <= rows; x++) {
      columnValues[`${column}1`].push(data[0][`${column}${x}`].v);
    }
    return Object.keys(columnValues).map(col => {
      const poraca = columnValues[col].reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});
      const toReturn = Object.keys(poraca).map(po => ({
        [data[0][col].v]: po,
        total: poraca[po]
      }));
      return toReturn;
    })[0];
  })[0];

  const keys1 = ["total"];

  const indexBy = data[0][columns[0]].v;
  const toSend = { keys1, indexBy, data1 };

  res.send(toSend);
});

router.post("/getGroupedForBarGraph", (req, res) => {
  const workbook = xlsx.readFile("public/DATA_VENTAS.xlsx");
  const sheets = workbook["SheetNames"];
  const data = sheets.map(sheet => workbook["Sheets"][sheet]);
  const lastCell = data[0]["!ref"].split(":")[1];
  const lastCellWithNoDigits = lastCell.replace(/[0-9]/g, "");
  const rows = lastCell.replace(/\D/g, "");
  const legendCol = req.body.legend.replace(/[0-9]/g, "");
  const valueCol = req.body.value.replace(/[0-9]/g, "");

  const fullValueCol = Object.keys(data[0])
    .map(col => col)
    .filter(col => col[0] === valueCol)
    .map(row => data[0][row].v)
    .filter((row, i) => i !== 0);

  const cols = [];
  for (let x = 2; x <= rows; x++) {
    const leg = data[0][`${legendCol}${x}`].v;
    const val = data[0][`${valueCol}${x}`].v;
    cols.push({ [leg]: val });
  }

  const fullLegendCol = Array.from(
    new Set(
      Object.keys(data[0])
        .map(col => col)
        .filter(col => col[0] === legendCol)
        .map(row => data[0][row].v)
        .filter((row, i) => i !== 0)
    )
  );
  const reducedCols = cols.reduce((acc, next) => {
    acc[Object.keys(next)[0]] =
      next[Object.keys(next)] + (acc[Object.keys(next)[0]] || 0);
    return acc;
  }, {});

  res.send(reducedCols);
});

router.post("/getGroupedForLineGraph", (req, res) => {
  try {
    const workbook = xlsx.readFile("public/DATA_VENTAS.xlsx");
    const sheets = workbook["SheetNames"];
    const data = sheets.map(sheet => workbook["Sheets"][sheet]);
    const lastCell = data[0]["!ref"].split(":")[1];
    const lastCellWithNoDigits = lastCell.replace(/[0-9]/g, "");
    const rows = lastCell.replace(/\D/g, "");
    const legendCol = req.body.legend.replace(/[0-9]/g, "");
    const valueCol = req.body.value.replace(/[0-9]/g, "");
    // const legendCol = "I";
    // const valueCol = "E";

    const fullValueCol = Object.keys(data[0])
      .map(col => col)
      .filter(col => col[0] === valueCol)
      .map(row => data[0][row].v)
      .filter((row, i) => i !== 0);

    const cols = [];
    for (let x = 2; x < rows; x++) {
      const leg = data[0][`${legendCol}${x}`].v;
      const val = data[0][`${valueCol}${x}`].v;
      cols.push({ [leg]: val });
    }

    const fullLegendCol = Array.from(
      new Set(
        Object.keys(data[0])
          .map(col => col)
          .filter(col => col[0] === legendCol)
          .map(row => data[0][row].v)
          .filter((row, i) => i !== 0)
      )
    );
    const reducedCols = cols.reduce((acc, next) => {
      acc[Object.keys(next)[0]] =
        next[Object.keys(next)] + (acc[Object.keys(next)[0]] || 0);
      return acc;
    }, {});

    const ready = Object.keys(reducedCols).map(k => ({
      x: k,
      y: reducedCols[k]
    }));

    res.send({ id: "All", data: ready });
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

router.post("/getTotal", (req, res) => {
  try {
    const columns = Object.keys(req.body).filter(column => req.body[column]);

    const workbook = xlsx.readFile("public/DATA_VENTAS.xlsx");
    const sheets = workbook["SheetNames"];
    const data = sheets.map(sheet => workbook["Sheets"][sheet]);
    const lastCell = data[0]["!ref"].split(":")[1];
    const lastCellWithNoDigits = lastCell.replace(/[0-9]/g, "");
    const rows = lastCell.replace(/\D/g, "");
    const columnsWithNoDigits = columns.map(column =>
      column.replace(/[0-9]/g, "")
    );
    const data1 = columnsWithNoDigits.map(column => {
      const columnValues = {};
      columnValues[`${column}1`] = [];
      for (let x = 2; x <= rows; x++) {
        columnValues[`${column}1`].push(data[0][`${column}${x}`].v);
      }

      return Object.keys(columnValues)
        .map(col => columnValues[col])[0]
        .reduce((prev, cur) => prev + cur, 0);
    })[0];

    res.send({ value: data1, title: data[0][columns[0]].v });
  } catch (error) {
    console.log("error", error);
    res.sendStatus(500);
  }
});

module.exports = router;
