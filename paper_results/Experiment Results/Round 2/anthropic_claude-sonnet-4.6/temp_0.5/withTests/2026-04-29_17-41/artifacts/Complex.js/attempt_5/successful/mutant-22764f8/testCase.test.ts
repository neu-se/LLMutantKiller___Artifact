import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should compute acot of a real number correctly', () => {
    // acot(1) = atan(1/1) = pi/4
    const c = new Complex(1, 0);
    const result = c.acot();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});