import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should handle division by zero case when oneMinus is zero", () => {
    const c = new Complex(1, 0.1);
    const result = c.atanh();
    // When oneMinus = 0, the mutation causes division by zero (0/0 = NaN)
    // while original computes 0*0 = 0
    expect(result.isNaN()).toBe(true);
  });
});