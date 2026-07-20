import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.1", () => {
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    // The actual output from the original code for expm1(0 + 0.1i).re
    // This tests the cosm1 function indirectly through expm1
    expect(result.re).toBeCloseTo(-0.004995834721974235, 15);
  });
});