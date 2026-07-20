import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation', () => {
  it('asec(2) should return the correct arcsecant value', () => {
    // a=2, b=0, d=4, d!==0
    // Original (d!==0 is true): new Complex(2/4, 0).acos() = new Complex(0.5, 0).acos()
    // Mutated (false): new Complex((true)?2/0:0, 0).acos() = new Complex(Infinity, 0).acos()
    const result = new Complex(2, 0).asec();
    const expected = new Complex(0.5, 0).acos();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});