import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch mutation test', () => {
  it('should correctly compute acsch for a real nonzero number', () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    const expected = Math.log(2 + Math.sqrt(4 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});