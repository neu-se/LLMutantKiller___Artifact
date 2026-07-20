import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with undefined input", () => {
  it("should correctly handle undefined input by creating zero complex number", () => {
    const c = new Complex(undefined);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});