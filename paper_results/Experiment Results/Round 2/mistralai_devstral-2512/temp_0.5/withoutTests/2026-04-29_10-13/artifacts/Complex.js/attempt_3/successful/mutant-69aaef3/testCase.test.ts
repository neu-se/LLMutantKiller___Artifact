import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute hypot when b is not zero", () => {
    const c = new Complex(3000, 2000);
    const abs = c.abs();
    expect(abs).toBeCloseTo(3605.551275463989, 10);
  });
});