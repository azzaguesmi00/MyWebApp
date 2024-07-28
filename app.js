const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');

// Middleware to verify the time of the request
app.use((req, res, next) => {
  const currentDateTime = new Date();
  const day = currentDateTime.getDay();
  const hour = currentDateTime.getHours();

  // Check if current time is within working hours (Monday to Friday, 9 to 17)
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, 9 to 17).');
  }
});

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Use the index router for all routes
app.use('/', indexRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
