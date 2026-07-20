import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should return the correct result for the expm1 function", () => {
    const complex = new Complex(0.1, 0);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(0.105171);
    expect(result.im).toBeCloseTo(0);
  });
});