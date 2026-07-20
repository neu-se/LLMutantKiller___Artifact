describe("Complex", () => {
  it("should calculate acsch correctly when b is 0", () => {
    const Complex = require('../complex.js').Complex;
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});