describe("Complex", () => {
  it("should calculate acsch correctly when b is 0", () => {
    const Complex = require('./complex').Complex;
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).toBeCloseTo(0, 10);
  });
});