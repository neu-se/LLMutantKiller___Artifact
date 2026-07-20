import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly handle division by zero in acsc for complex numbers with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // This test specifically checks the behavior when b !== 0 in the acsc implementation
    // The mutation changes -b/0 to -b*0, which should produce different results
    expect(result.im).not.toBe(0);
  });
});