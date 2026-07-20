import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const c = new Complex('1+1i');
    const acosh = c.acosh();
    expect(acosh.re).toBeCloseTo(1.54308, 5);
    expect(acosh.im).toBeCloseTo(0.46365, 5);
  });
});