import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for the cosm1 function", () => {
    const x = 0.01;
    const complex = new Complex(x, 0);
    const result = complex.expm1();
    const expected = Math.expm1(x) - 1;
    expect(result.re).toBeCloseTo(expected);
  });
});