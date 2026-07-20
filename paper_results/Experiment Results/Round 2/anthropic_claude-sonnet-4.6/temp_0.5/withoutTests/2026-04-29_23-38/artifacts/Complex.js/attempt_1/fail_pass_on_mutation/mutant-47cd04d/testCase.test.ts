import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex add method with infinity', () => {
  it('should return NaN when adding two infinite complex numbers', () => {
    const result = Complex['INFINITY'].add(Complex['INFINITY']);
    expect(result.isNaN()).toBe(true);
  });
});