function romanToArabic() {
  const romanNumeral = document.getElementById("romanInput").value;
  const arabicNumeral = roman_to_arabic(romanNumeral);
  document.getElementById("result").innerHTML = `Resultado: ${arabicNumeral}`;
}

function arabicToRoman() {
  const arabicNumeral = document.getElementById("arabicInput").value;
  const romanNumeral = arabic_to_roman(arabicNumeral);
  document.getElementById("result").innerHTML = `Resultado: ${romanNumeral}`;
}

function roman_to_arabic(romanNumeral) {
  romanNumeral = romanNumeral.toUpperCase();
  const romanValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let arabicNumeral = 0;
  let prevValue = 0;

  for (let i = romanNumeral.length - 1; i >= 0; i--) {
    const char = romanNumeral[i];
    const value = romanValues[char];

    if (value >= prevValue) {
      arabicNumeral += value;
    } else {
      arabicNumeral -= value;
    }

    prevValue = value;
  }

  return arabicNumeral;
}

function arabic_to_roman(arabicNumeral) {
  const romanValues = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let romanNumeral = "";

  for (let i = 0; i < romanValues.length; i++) {
    while (arabicNumeral >= romanValues[i].value) {
      romanNumeral += romanValues[i].symbol;
      arabicNumeral -= romanValues[i].value;
    }
  }

  return romanNumeral;
}
