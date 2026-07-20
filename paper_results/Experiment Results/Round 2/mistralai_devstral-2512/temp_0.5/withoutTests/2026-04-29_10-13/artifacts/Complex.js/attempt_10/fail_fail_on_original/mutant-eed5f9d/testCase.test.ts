import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle the case where both components are non-zero", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes (a !== 0) to (false) in the acsch method
    // This should cause different behavior when a is non-zero
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(-0.5493061443340548, 10);
  });
});