import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should handle (0, 0) case correctly", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});