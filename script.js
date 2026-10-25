
function startJourney() {
    window.location.href = "login.html";
}

function watchDemo() {
    document.querySelector("#process").scrollIntoView({
        behavior: "smooth"
    });
}

function sellCrop() {
    window.location.href = "sell-crops.html";
}

document.querySelector(".login-btn").addEventListener("click", function () {
    window.location.href = "login.html";
});

document.querySelector(".register-btn").addEventListener("click", function () {
    window.location.href = "registration.html";
});


function showAIDetails(type) {
    const data = {
        soil: ["🧪 Soil Analysis", "Check soil nutrients, pH and soil health."],
        crop: ["🌱 Crop Recommendation", "Choose suitable crops based on soil, season and water availability."],
        disease: ["🦠 Disease Detection", "Check crop leaves for spots and signs of disease."],
        pest: ["🐛 Pest Detection", "Check plants for insects and pest damage."],
        weather: ["🌦️ Weather Advisory", "Check weather forecasts before farming activities."],
        irrigation: ["💧 Smart Irrigation", "Plan watering according to soil moisture and crop needs."],
        fertilizer: ["🧴 Fertilizer Guide", "Choose fertilizer according to soil-test results."],
        harvest: ["📊 Harvest Prediction", "Estimate harvest time and possible crop yield."],
        market: ["💹 Market Prices", "Check crop market prices before selling."],
        logistics: ["🚚 Logistics Tracking", "Plan crop transportation and delivery."],
        payment: ["💳 Payment Management", "Manage crop sale payment details."]
    };

    const details = document.getElementById("aiDetails");

    if (!data[type] || !details) {
        return;
    }

    document.getElementById("aiTitle").textContent = data[type][0];
    document.getElementById("aiText").textContent = data[type][1];

    details.style.display = "block";
    details.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closeAIDetails() {
    document.getElementById("aiDetails").style.display = "none";
}

