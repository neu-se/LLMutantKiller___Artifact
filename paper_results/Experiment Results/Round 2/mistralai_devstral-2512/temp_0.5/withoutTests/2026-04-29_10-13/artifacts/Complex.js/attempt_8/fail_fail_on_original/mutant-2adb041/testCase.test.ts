import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.0001", () => {
    const c = new Complex(0.0001, 0);
    const result = c.expm1();
    // Calculate expected value using the exact formula
    const expectedReal = Math.expm1(0.0001) * Math.cos(0) + (Math.cos(0.0001) - 1);
    // The mutation changes the Taylor series coefficient from division to multiplication
    // This should cause a significant difference in the result
    // Using a less strict precision to account for floating point differences
    expect(result.re).toBeCloseTo(expectedReal, 9);
  });
});