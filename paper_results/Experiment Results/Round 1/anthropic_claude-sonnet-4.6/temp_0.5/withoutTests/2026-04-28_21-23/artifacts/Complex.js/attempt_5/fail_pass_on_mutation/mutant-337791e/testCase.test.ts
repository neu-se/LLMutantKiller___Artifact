import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp', () => {
  it('should compute exp of complex number with imaginary part pi/2', () => {
    // exp(i * pi/2) = cos(pi/2) + i*sin(pi/2) = 0 + i
    const z = new Complex(0, Math.PI / 2);
    const result = z.exp();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});