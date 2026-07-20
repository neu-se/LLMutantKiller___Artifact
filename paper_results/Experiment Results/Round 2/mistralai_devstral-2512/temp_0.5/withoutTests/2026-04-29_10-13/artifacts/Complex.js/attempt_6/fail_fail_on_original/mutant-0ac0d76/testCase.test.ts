import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should handle zero correctly", () => {
    const c = new Complex(0, 0);
    const result = c.log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBeNaN();
  });
});