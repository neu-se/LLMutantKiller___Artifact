import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('asec with tiny negative imaginary and tiny real where d underflows', () => {
    // a=Number.MIN_VALUE, b=-Number.MIN_VALUE: d underflows to 0
    // a !== 0 so early check bypassed
    // original: new Complex(a/0, -b/0) = new Complex(+Inf, +Inf).acos()
    // mutated:  new Complex(a/0, +b/0) = new Complex(+Inf, -Inf).acos()
    const originalPath = new Complex(Infinity, Infinity).acos();
    const mutatedPath = new Complex(Infinity, -Infinity).acos();
    // Check they differ
    const c = new Complex(Number.MIN_VALUE, -Number.MIN_VALUE);
    const result = c.asec();
    // Both paths: check which one matches
    expect(result.re).toEqual(originalPath.re);
    expect(result.im).toEqual(originalPath.im);
  });
});