describe("Complex", () => {
  it("should calculate log correctly for positive real numbers", () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complexNegative = new Complex(-1, 0);
    const resultNegative = complexNegative.log();
    expect(resultNegative.re).toBeNaN();
    const complexLarge = new Complex(2, 0);
    const resultLarge = complexLarge.log();
    expect(resultLarge.re).toBeCloseTo(Math.log(2), 10);
    expect(resultLarge.im).toBeCloseTo(0, 10);
  });
});