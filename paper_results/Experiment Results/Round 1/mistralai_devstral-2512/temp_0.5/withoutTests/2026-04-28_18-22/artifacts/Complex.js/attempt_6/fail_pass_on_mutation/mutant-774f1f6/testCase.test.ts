import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with numeric input", () => {
  it("should correctly parse real number from numeric input", () => {
    const c = new Complex(42);
    expect(c.re).toBe(42);
    expect(c.im).toBe(0);
  });
});