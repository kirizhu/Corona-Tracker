const express = require('express');
const app = express();
const axios = require('axios');

const port = 3001;
const currentUrl = 'https://covidtracking.com/api/v1/states/current.json';
const dailyUrl = 'https://covidtracking.com/api/v1/states/daily.json';

const mapDataCurrent = (data) => {
  let currentArr = [];
  data.forEach((state) => {
    let dataObj = {
      state: state.state,
      death: state.death,
      hospitalizedCurrently: state.hospitalizedCurrently,
    };
    currentArr.push(dataObj);
  });
  currentArr.sort((a, b) => a.state.localeCompare(b.state));
  return currentArr;
};

const fetchCurrent = async () => {
  try {
    const { data } = await axios.get(currentUrl);
    return mapDataCurrent(data);
  } catch (error) {
    return error;
  }
};

const mapDataDaily = (data) => {
  let dailyArr = [];
  let num = Number(dateFormat());
  data.forEach((state) => {
    if (state.date == num) {
      dailyArr.push(state.death);
    }
  });
  return dailyArr;
};

const fetchDaily = async () => {
  try {
    const { data } = await axios.get(dailyUrl);
    return mapDataDaily(data);
  } catch (error) {
    return error;
  }
};

const dateFormat = () => {
  let date = new Date();
  date.setDate(date.getDate() - 2);
  return date.toISOString().slice(0, 10).split('-').join('');
};

app.get('/', async (req, res) => {
  let currentData = await fetchCurrent();
  let dailyData = await fetchDaily();
  for (let i = 0; i < currentData.length; i++) {
    currentData[i].oldDeath = dailyData[i];
  }
  res.send(currentData);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
