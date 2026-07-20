import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(3+i) matches the mathematically correct value asinh(1/z)', () => {
    const z = new Complex(3, 1);
    const result = z.acsch();
    // 1/(3+i) = (3-i)/10 = 0.3 - 0.1i
    const expected = new Complex(0.3, -0.1).asinh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});