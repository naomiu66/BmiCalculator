var express = require("express");
var router = express.Router();

var bmiCategory = require("../models/enums/bmiCategory");

router.post("/calculate-bmi", (req, res) => {
  const { weight, height } = req.body;
  if (
    !weight ||
    typeof weight !== "number" ||
    weight <= 0 ||
    !height ||
    typeof height !== "number" ||
    height <= 0
  )
    return res.status(400).send(null);

  console.log(
    `get request: weight: ${req.body.weight}, height: ${req.body.height}`
  );

  var bmi = weight / (height / 100) ** 2;
  var category = 0;

  if (bmi < 18.5) category = bmiCategory.Underweight;
  else if (bmi >= 18.5 && bmi < 24.9) category = bmiCategory.NormalWeight;
  else if (bmi >= 25 && bmi < 29.9) category = bmiCategory.Overweight;
  else if (bmi >= 30) category = bmiCategory.Obese;

  var data = { bmi: bmi, category: category };
  console.log(`sending the data: bmi: ${data.bmi}, category: ${data.category}`);
  return res.send(data);
});

module.exports = router;
