import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate atanh correctly for a specific input', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});