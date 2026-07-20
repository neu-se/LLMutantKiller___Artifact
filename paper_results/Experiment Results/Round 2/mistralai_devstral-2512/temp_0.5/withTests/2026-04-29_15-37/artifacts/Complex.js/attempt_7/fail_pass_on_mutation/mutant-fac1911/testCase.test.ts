import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should produce finite results for complex numbers with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // Check that both components are finite numbers
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
  });
});