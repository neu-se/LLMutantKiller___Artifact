import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cosm1 for values in Taylor series range", () => {
    const c = new Complex(0.5, 0);
    const result = c.expm1();
    // This value is specifically chosen to be in the Taylor series range (-π/4 to π/4)
    // and should expose the mutation in the cosm1 calculation
    expect(result.re).toBeCloseTo(0.6487212707001282, 12);
    expect(result.im).toBeCloseTo(0, 12);
  });
});