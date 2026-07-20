import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sech() method', () => {
  it('should correctly compute sech for a complex number with real part 1 and imaginary part 1', () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes -2 * sinh(a) to -2 / sinh(a), which will produce different results
    // We test the imaginary part specifically since that's where the mutation occurs
    expect(result.im).toBeCloseTo(-0.4199743416490265, 10);
  });
});