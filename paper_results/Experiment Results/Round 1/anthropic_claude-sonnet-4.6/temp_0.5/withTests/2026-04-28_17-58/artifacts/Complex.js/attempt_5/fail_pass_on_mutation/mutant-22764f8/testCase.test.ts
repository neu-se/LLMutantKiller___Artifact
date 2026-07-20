import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return correct real value for asec of real number greater than 1', () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    // asec(2) = acos(1/2) = pi/3
    const piOver3 = Math.PI / 3;
    expect(result.re).toBeCloseTo(piOver3, 5);
    expect(result.im).toBeCloseTo(0, 5);
    expect(isNaN(result.re)).toBe(false);
  });
});