import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp', () => {
  it('exp(0 + 1i) should have correct real and imaginary parts', () => {
    const z = new Complex(0, 1);
    const result = z.exp();
    // exp(i) = cos(1) + i*sin(1)
    // Mutated code with im!==0 would return new Complex(Math.exp(0), 0) = new Complex(1, 0)
    expect(result.re).toBeCloseTo(Math.cos(1), 10);
    // This will fail on mutated code if it returns im=0 instead of sin(1)
    expect(result.im).toBeCloseTo(Math.sin(1), 10);
  });
});