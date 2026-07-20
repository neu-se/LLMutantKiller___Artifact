import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation test', () => {
  it('should compute acsc correctly with imaginary component', () => {
    // acsc(i) where a=0, b=1, d=1 != 0
    // normal path: new Complex(0/1, -1/1).asin() = new Complex(0, -1).asin()
    // mutated path would have +b/0 in the d===0 branch (unreachable here)
    // Need to find a case where d=0 but b!=0... impossible
    // Let's test with a purely imaginary number
    const result = new Complex(0, 1).acsc();
    const expected = new Complex(0, 1).inverse().asin(); // asin(1/i) = asin(-i)
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});