import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const c = new Complex('0.0001');
    const result = c.exp().sub(1);
    expect(result.re).toBeCloseTo(0.00010000000000000005, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});