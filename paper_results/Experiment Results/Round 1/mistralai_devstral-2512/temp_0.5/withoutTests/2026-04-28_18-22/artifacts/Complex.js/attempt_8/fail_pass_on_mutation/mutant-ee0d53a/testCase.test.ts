import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function", () => {
  it("should use the optimized path for large values where a >= 3000", () => {
    const c = new Complex(3000, 1);
    const abs = c.abs();
    expect(abs).toBeCloseTo(3000.0001666666626, 12);
  });
});