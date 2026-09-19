document.getElementById('convertBtn').addEventListener('click', function () {
    const inputField = document.getElementById('tempInput').value.trim();
    const unit = document.getElementById('unitSelect').value;
    const errorBox = document.getElementById('errorBox');
    const cDisplay = document.getElementById('celsiusVal');
    const fDisplay = document.getElementById('fahrenheitVal');
    const kDisplay = document.getElementById('kelvinVal');

    // Reset error state
    errorBox.style.display = 'none';
    errorBox.innerText = '';

    // Validation: Empty or non-numeric check
    if (inputField === '' || isNaN(inputField)) {
        showError('Please enter a valid numeric temperature value.');
        clearDisplays();
        return;
    }

    const value = parseFloat(inputField);
    let celsius, fahrenheit, kelvin;

    // Conversion formulas
    if (unit === 'celsius') {
        celsius = value;
        fahrenheit = (value * 9 / 5) + 32;
        kelvin = value + 273.15;
    } else if (unit === 'fahrenheit') {
        celsius = (value - 32) * 5 / 9;
        fahrenheit = value;
        kelvin = celsius + 273.15;
    } else if (unit === 'kelvin') {
        kelvin = value;
        celsius = value - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
    }

    // Absolute Zero Error Handling (below 0 Kelvin / -273.15°C)
    if (kelvin < 0) {
        showError('Physical limit error: Temperature cannot be lower than absolute zero (-273.15°C / 0 K).');
        clearDisplays();
        return;
    }

    // Render output
    cDisplay.innerText = `${celsius.toFixed(2)} °C`;
    fDisplay.innerText = `${fahrenheit.toFixed(2)} °F`;
    kDisplay.innerText = `${kelvin.toFixed(2)} K`;

    function showError(message) {
        errorBox.innerText = message;
        errorBox.style.display = 'block';
    }

    function clearDisplays() {
        cDisplay.innerText = '--';
        fDisplay.innerText = '--';
        kDisplay.innerText = '--';
    }
});