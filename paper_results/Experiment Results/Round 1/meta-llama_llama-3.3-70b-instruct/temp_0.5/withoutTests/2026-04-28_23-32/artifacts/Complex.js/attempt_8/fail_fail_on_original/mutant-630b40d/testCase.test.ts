const Complex = require('./complex');

describe("Complex", () => {
  it("should calculate abs correctly for small numbers", () => {
    const complex = new Complex(1, 1);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(2));
  });
});