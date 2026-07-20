import { Complex } from "./complex.js";

describe("Complex.js", () => {
  it("should calculate the complex sinh correctly", () => {
    const complex = new Complex(1, 0);
    const sinh = complex.sinh();
    expect(sinh.re).toBeCloseTo((Math.exp(1) - Math.exp(-1)) / 2);
    expect(sinh.im).toBeCloseTo(0);
    // This should fail on the mutated code
    expect(sinh.re).not.toBeCloseTo((Math.exp(1) - Math.exp(-1)));
  });
});