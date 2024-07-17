// Event listener for the clear button
document.getElementById("clearBtn").addEventListener("click", function () {
  // Clear input fields and result display

  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("result").textContent = "00.00";
  document.getElementById("comment").textContent = "";
  document.getElementById("commentfromapi").textContent = "";
});

// Event listener for the export button
document.getElementById("exportBtn").addEventListener("click", () => {
  // Get BMI data from input fields and result display

  const data = {
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    bmi: document.getElementById("result").textContent.trim(),
  };
  // Convert data to JSON format
  const jsonData = JSON.stringify(data);
  // Create a Blob with JSON data
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Create a link element to trigger download
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "data.json";

  // Append link to the document body and trigger click
  document.body.appendChild(a);
  a.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
});

// Event listener for the BMI form submission
document.getElementById("bmiForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission
  var BMIasWhole;
  const bmiUrl = "https://fitness-calculator.p.rapidapi.com/bmi";
  // Default age for BMI calculation (age does not matter, only for API input)
  const age = 18;
  // Get height and weight from input fields
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

  try {
    // Fetch BMI calculation result
    const response = await fetch(bmiUrl + bmiQueryString, bmiOptions);
    const result = await response.json();
    // Display BMI result
    displayResult(result.data.bmi);
    BMIasWhole = Math.round(result.data.bmi);
    console.log(result);
  } catch (error) {
    console.error(error);
  }

  // Numbers API
  const url =
    "https://numbersapi.p.rapidapi.com/" +
    BMIasWhole +
    "/math?fragment=true&json=true";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "eddabf6e87msh72195a356d91ab8p176f23jsn891d29facfbe",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    const resultDiv = document.getElementById("comment");
    const resultDivAPI = document.getElementById("commentfromapi");

    // Display comment based on NumbersAPI result
    resultDiv.innerHTML = `We took your decimal BMI and it the whole number, ${BMIasWhole}. According to NumbersAPI™, your number is...</p>`;
    resultDivAPI.innerHTML = `${result.text}!</p>`;
  } catch (error) {
    console.error(error);
  }
});

// Function to display BMI result and color code
function displayResult(bmi) {
  const resultDiv = document.getElementById("result");
  let color = "";
  // Determine color based on BMI range
  if (bmi < 18.5) {
    color = "skyblue"; // Underweight
  } else if (bmi >= 18.5 && bmi < 25) {
    color = "green"; // Normal weight
  } else if (bmi >= 25 && bmi < 30) {
    color = "gold"; // Overweight
  } else if (bmi >= 30 && bmi < 35) {
    color = "orange"; // Obese
  } else if (bmi >= 35 && bmi < 40) {
    color = "darksalmon"; // Obese
  } else {
    color = "red"; // Obese
  }

  // Display BMI result with color
  resultDiv.innerHTML = `<span style="color: ${color};">${bmi.toFixed(
    2
  )}</span></p>`;
}