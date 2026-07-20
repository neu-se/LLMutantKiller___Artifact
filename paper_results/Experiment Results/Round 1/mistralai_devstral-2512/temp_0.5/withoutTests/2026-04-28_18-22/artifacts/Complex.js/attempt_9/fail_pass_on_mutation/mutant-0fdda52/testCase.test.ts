import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute hypot for large values where a < b", () => {
    const a = 1000;
    const b = 2000;
    const c = new Complex(a, b);
    const abs = c.abs();
    const expected = Math.sqrt(a * a + b * b);
    expect(abs).toBeCloseTo(expected, 14);
  });
});