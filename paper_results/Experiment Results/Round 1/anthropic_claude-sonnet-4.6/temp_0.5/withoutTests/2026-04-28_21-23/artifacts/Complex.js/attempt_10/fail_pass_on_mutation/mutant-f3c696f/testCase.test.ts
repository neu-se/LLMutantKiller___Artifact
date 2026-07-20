import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('acot of complex number with zero real part and unit imaginary returns correct infinity', () => {
    const result = new Complex(0, 1).acot();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});