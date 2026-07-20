import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should detect mutation in atanh calculation", () => {
    const c = new Complex(0.5, 0.1);
    const result = c.atanh();
    // The mutation changes oneMinus*oneMinus to oneMinus/oneMinus
    // This will cause different behavior in the denominator calculation
    // We test for the specific behavior difference
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeGreaterThan(0);
  });
});