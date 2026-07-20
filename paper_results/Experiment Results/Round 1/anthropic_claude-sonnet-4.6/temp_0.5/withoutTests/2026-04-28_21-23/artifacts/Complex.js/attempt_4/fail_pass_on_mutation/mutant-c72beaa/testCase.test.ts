import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('acot of complex number with subnormal magnitude should handle d=0 branch', () => {
    // Use subnormal numbers where a^2 + b^2 underflows to 0
    const tiny = 5e-324; // Number.MIN_VALUE
    // With b != 0 and d = 0:
    // Original: new Complex(a/0, -b/0).atan() = new Complex(Infinity, -Infinity).atan()
    // Mutated: new Complex(a*0, -b/0).atan() = new Complex(0, -Infinity).atan()
    const result = new Complex(tiny, tiny).acot();
    const originalExpected = new Complex(Infinity, -Infinity).atan();
    expect(result.re).toBe(originalExpected.re);
    expect(result.im).toBe(originalExpected.im);
  });
});