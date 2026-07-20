import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot mutation test', () => {
  it('should correctly compute acot(0) returning pi/2', () => {
    const result = new Complex(0, 0).acot();
    // acot(0) = pi/2
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});