import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function mutation", () => {
  it("should correctly compute hypot when y is larger than x", () => {
    const c = new Complex(1000, 2000);
    const abs = c.abs();
    expect(abs).toBeCloseTo(2236.0679774997898, 10);
  });
});