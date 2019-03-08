var express = require('express');
var router = express.Router();
const fs = require('fs');
const faker = require('faker');
const xlsx = require('xlsx');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.send('desde el server');
});

router.post('/uploadData', (req, res, next) => {
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

router.get('/files', (req, res) => {
  const workbook = xlsx.readFile('public/data.csv');
  const sheets = workbook['SheetNames'];
  const data = sheets.map(sheet => workbook['Sheets'][sheet]);
  const lastCell = data[0]['!ref'].split(':')[1];
  const lastCellWithNoDigits = lastCell.replace(/[0-9]/g, '');
  const rows = lastCell.replace(/\D/g, '');

  const columns = [];
  console.log(Object.keys(data['0']).length - 1, rows);
  const columnAmount = (Object.keys(data['0']).length - 1) / rows;
  for (let x = 0; x < columnAmount; x++) {
    const key = Object.keys(data['0'])[x];
    const type = data['0'][key].t === 's' ? 'string' : 'int';
    columns.push({ key, columnName: data['0'][key].v, type });
  }

  res.send(data);
});

router.get('/createFake', () => {
  const rows = [
    '',
    'Nombre',
    'Apellido',
    'Fecha de Suscripcion',
    'Numero de telefono',
    'Correo Electronico',
    'Puesto de trabajo',
    'Nombre de Usuario',
    'Pais',
    'Ciudad',
    'Direccion',
    'Producto',
    'Precio'
  ];
  const rows2 = [];
  for (let x = 0; x < 20000; x++) {
    const customer = [
      '\n',
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
  fs.writeFile('public/data.csv', rows, err => {
    if (err) {
      console.log(err);
    }
    console.log('gooo');
  });
});

router.post('/getAmount', (req, res) => {
  const columns = Object.keys(req.body).filter(column => req.body[column]);

  const workbook = xlsx.readFile('public/data.csv');
  const sheets = workbook['SheetNames'];
  const data = sheets.map(sheet => workbook['Sheets'][sheet]);
  const lastCell = data[0]['!ref'].split(':')[1];
  const lastCellWithNoDigits = lastCell.replace(/[0-9]/g, '');
  const rows = lastCell.replace(/\D/g, '');
  const columnsWithNoDigits = columns.map(column =>
    column.replace(/[0-9]/g, '')
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

  const keys1 = ['total'];

  const indexBy = data[0][columns[0]].v;
  const toSend = { keys1, indexBy, data1 };

  res.send(toSend);
});

router.post('/getTotal', (req, res) => {
  const columns = Object.keys(req.body).filter(column => req.body[column]);

  const workbook = xlsx.readFile('public/data.csv');
  const sheets = workbook['SheetNames'];
  const data = sheets.map(sheet => workbook['Sheets'][sheet]);
  const lastCell = data[0]['!ref'].split(':')[1];
  const lastCellWithNoDigits = lastCell.replace(/[0-9]/g, '');
  const rows = lastCell.replace(/\D/g, '');
  const columnsWithNoDigits = columns.map(column =>
    column.replace(/[0-9]/g, '')
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

  res.send(data1);
});

module.exports = router;
