import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function", () => {
  it("should correctly calculate hypot for large values", () => {
    const c = new Complex(3000, 4000);
    const abs = c.abs();
    expect(abs).toBeCloseTo(5000, 10);
  });
});