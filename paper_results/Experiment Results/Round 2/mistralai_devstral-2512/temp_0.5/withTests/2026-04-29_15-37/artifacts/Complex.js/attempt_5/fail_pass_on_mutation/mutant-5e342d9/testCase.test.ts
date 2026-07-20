import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function behavior", () => {
  it("should correctly calculate hypot for large values where a >= b", () => {
    const a = 4000;
    const b = 2000;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    const actualAbs = c.abs();
    expect(actualAbs).toBeCloseTo(expectedAbs);
    expect(actualAbs).not.toBe(Infinity);
  });
});