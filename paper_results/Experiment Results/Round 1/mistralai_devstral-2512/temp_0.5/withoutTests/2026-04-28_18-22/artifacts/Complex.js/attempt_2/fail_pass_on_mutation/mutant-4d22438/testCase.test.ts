import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute hypot for large values where b > a", () => {
    const a = 1;
    const b = 5000;
    const c = new Complex(a, b);
    const abs = c.abs();
    const expected = Math.sqrt(a * a + b * b);
    expect(abs).toBeCloseTo(expected, 10);
  });
});