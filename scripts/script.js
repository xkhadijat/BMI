document.getElementById("clearBtn").addEventListener("click", function () {
  console.log("Clear button clicked");
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("result").textContent = "00.00";
  document.getElementById("comment").textContent = "";
  document.getElementById("commentfromapi").textContent = "";
});

document.getElementById("exportBtn").addEventListener("click", () => {
  console.log("Export button clicked");
  const data = {
      height: document.getElementById("height").value,
      weight: document.getElementById("weight").value,
      bmi: document.getElementById("result").textContent.trim(),
  };
  const jsonData = JSON.stringify(data);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "data.json";

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  }, 0);
});

document.getElementById("bmiForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Form submitted");
  var BMIasWhole;
  const bmiUrl = "https://fitness-calculator.p.rapidapi.com/bmi";
  const age = 18;
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  const bmiOptions = {
      method: "GET",
      headers: {
          "X-RapidAPI-Key": "eddabf6e87msh72195a356d91ab8p176f23jsn891d29facfbe",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
      },
  };

  const bmiQueryString = `?age=${age}&weight=${weight}&height=${height}`;
  console.log(`Request URL: ${bmiUrl + bmiQueryString}`);

  try {
      const response = await fetch(bmiUrl + bmiQueryString, bmiOptions);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("BMI API response:", result);
      displayResult(result.data.bmi);
      BMIasWhole = Math.round(result.data.bmi);
  } catch (error) {
      console.error("Error fetching BMI data:", error);
      alert(`Error fetching BMI data: ${error.message}`);
      return; // Exit if there's an error with the BMI API
  }

  const url = `https://numbersapi.p.rapidapi.com/${BMIasWhole}/math?fragment=true&json=true`;
  const options = {
      method: "GET",
      headers: {
          "X-RapidAPI-Key": "eddabf6e87msh72195a356d91ab8p176f23jsn891d29facfbe",
          "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
      },
  };

  try {
      const response = await fetch(url, options);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Numbers API response:", result);
      document.getElementById("comment").innerHTML = `We took your decimal BMI and it the whole number, ${BMIasWhole}. According to NumbersAPI™, your number is...`;
      document.getElementById("commentfromapi").innerHTML = `${result.text}!`;
  } catch (error) {
      console.error("Error fetching Numbers API data:", error);
      alert(`Error fetching Numbers API data: ${error.message}`);
  }
});

function displayResult(bmi) {
  const resultDiv = document.getElementById("result");
  let color = "";
  if (bmi
