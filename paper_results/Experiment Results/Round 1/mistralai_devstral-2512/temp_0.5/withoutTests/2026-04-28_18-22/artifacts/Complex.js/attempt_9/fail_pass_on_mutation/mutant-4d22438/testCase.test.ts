import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute hypot when y > x with specific large values", () => {
    const x = 1;
    const y = 3000;
    const c = new Complex(x, y);
    const abs = c.abs();
    const expected = Math.sqrt(x * x + y * y);
    expect(abs).toBeCloseTo(expected, 10);
  });
});