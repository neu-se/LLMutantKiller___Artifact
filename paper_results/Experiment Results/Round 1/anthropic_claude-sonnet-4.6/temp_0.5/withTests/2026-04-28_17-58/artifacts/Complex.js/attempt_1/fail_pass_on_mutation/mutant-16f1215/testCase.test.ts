import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsc mutation test', () => {
  it('acsc(0 + 0i) should return Complex(PI/2, Infinity)', () => {
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);
  });
});