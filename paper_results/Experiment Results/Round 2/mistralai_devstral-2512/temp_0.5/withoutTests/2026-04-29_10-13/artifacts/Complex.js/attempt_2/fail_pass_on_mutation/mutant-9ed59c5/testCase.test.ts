// Test case to detect the mutation in complex.js
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js module export", () => {
  it("should properly export the Complex class in CommonJS environment", () => {
    const c = new Complex(1, 2);
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
    expect(typeof Complex).toBe('function');
  });
});