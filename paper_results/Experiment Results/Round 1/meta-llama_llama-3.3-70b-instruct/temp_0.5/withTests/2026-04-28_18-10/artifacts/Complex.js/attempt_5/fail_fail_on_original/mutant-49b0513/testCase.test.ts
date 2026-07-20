import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    const temp = result.re;
    expect(temp).toBeCloseTo(0.5493061443340548);
  });
});