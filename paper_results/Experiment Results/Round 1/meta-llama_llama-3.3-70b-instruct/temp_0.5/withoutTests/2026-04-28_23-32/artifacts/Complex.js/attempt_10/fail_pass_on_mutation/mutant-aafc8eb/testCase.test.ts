import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for the expm1 function with a small real part", () => {
    const x = 0.00001;
    const complex = new Complex(x, 0);
    const result = complex.expm1();
    const expectedReal = Math.expm1(x);
    expect(result.re).toBeCloseTo(expectedReal);
  });
});