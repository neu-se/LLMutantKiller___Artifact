import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly calculate cosm1 for small values of x", () => {
    const x = 0.0001;
    const result = Math.cos(x) - 1;
    const complexResult = Complex.cosm1(x);
    expect(Math.abs(result - complexResult)).toBeLessThan(1e-10);
  });
});