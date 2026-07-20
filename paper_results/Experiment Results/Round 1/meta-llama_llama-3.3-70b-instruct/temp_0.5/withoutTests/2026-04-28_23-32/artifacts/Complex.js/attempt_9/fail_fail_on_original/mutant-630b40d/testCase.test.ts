const Complex = require('../complex');

describe("Complex", () => {
  it("should calculate abs correctly for small numbers", () => {
    const complex = new Complex(3, 4);
    const result = complex.abs();
    expect(result).toBeCloseTo(5);
  });
});