// Test case to detect the mutation in complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with undefined input", () => {
  it("should correctly handle undefined input by setting both real and imaginary parts to 0", () => {
    const c = new Complex(undefined);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.toString()).toBe("0");
  });
});