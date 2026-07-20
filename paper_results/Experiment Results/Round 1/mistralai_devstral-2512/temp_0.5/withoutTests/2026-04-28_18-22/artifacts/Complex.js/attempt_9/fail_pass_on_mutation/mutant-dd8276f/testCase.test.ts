import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should handle (0, 0) case with correct behavior", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);
  });
});