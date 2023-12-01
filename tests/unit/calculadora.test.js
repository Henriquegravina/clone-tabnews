const calculadora = require("../models/calculadora.js");

test("Deve retornar 4", () => {
  expect(calculadora.somar(2, 2)).toBe(4);
});

test("Deve retornar 105", () => {
  expect(calculadora.somar(5, 100)).toBe(105);
});
