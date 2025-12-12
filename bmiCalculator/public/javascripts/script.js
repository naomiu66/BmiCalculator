const apiUrl = "http://localhost:3000/bmi";

const form = document.getElementById("submit_form");
const result = document.getElementById("resultBlock");

function mapCategory(category) {
  var color;
  switch (category) {
    case 1:
      color = "#2a9bb4ff";
      return { category: "Underweight", color: color };
    case 2:
      color = "#7be176";
      return { category: "Normal weight", color: color };
    case 3:
      color = "#ff9933";
      return { category: "Overweight", color: color };
    case 4:
      color = "#b42a2aff";
      return { category: "Obese", color: color };
  }
}

async function calculateBmi({ weight, height }) {
  try {
    const payload = {
      weight: weight,
      height: height,
    };

    const response = await fetch(`${apiUrl}/calculate-bmi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log("failed to send request to api: ", err);
    return null;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const weight = document.getElementById("weight");
  const height = document.getElementById("height");
  const calculatedBmi = document.getElementById("calculatedBmi");
  const category = document.getElementById("category");

  let jsonRequest = { weight: parseInt(weight.value), height: parseInt(height.value) };

  var data = await calculateBmi(jsonRequest);

  if (data == null) {
    alert("invalid data");
    return;
  }
  const categoryMapping = mapCategory(data.category);

  calculatedBmi.textContent = data.bmi.toFixed(1);
  category.textContent = categoryMapping.category;
  category.style.color = categoryMapping.color;

  result.style.display = "block";
});
