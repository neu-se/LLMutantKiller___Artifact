import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation test', () => {
  it('acsc of a purely imaginary number should produce correct result', () => {
    const z = new Complex(0, 2);
    const result = z.acsc();
    // acsc(2i) = asin(1/(2i)) = asin(-i/2)
    const expected = new Complex(0, 2).inverse().asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});