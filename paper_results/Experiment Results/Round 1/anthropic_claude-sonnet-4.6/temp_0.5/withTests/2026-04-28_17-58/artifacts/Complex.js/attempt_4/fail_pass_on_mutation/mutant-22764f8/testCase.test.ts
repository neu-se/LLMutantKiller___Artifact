import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should correctly compute asec for a complex number with non-zero imaginary part', () => {
    // asec(1+i): d = 1+1 = 2, computes acos((1/2) + (-1/2)i)
    const result = new Complex(1, 1).asec();
    const expected = new Complex(1, 1).inverse().acos();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});