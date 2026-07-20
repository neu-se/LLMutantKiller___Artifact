import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation test', () => {
  it('acsc of a real number should return correct result', () => {
    // acsc(1) = pi/2
    const result = new Complex(1, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});