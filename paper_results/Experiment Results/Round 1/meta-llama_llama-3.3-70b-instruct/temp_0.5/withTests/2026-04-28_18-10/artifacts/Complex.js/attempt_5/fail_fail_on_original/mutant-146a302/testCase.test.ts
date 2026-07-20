import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate sec correctly for specific input', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(2.085829642933553);
    expect(result.im).toBeCloseTo(0.0);
  });
});