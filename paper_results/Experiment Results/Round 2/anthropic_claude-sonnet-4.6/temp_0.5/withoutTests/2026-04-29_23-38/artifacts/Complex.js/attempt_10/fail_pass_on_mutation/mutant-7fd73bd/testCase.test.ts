import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow mutation test', () => {
  it('pow of complex number with positive real part and imaginary part raised to real exponent', () => {
    // (1+i)^3 = -2+2i
    const z = new Complex(1, 1);
    const result = z.pow(new Complex(3, 0));
    expect(result.re).toBeCloseTo(-2, 10);
    expect(result.im).toBeCloseTo(2, 10);
  });
});