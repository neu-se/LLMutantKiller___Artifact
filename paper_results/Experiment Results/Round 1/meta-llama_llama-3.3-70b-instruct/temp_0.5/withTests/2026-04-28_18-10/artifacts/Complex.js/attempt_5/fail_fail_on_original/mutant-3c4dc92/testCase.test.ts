import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate atanh correctly for value 1', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });

  it('should calculate atanh correctly for value close to 1', () => {
    const complex = new Complex(0.999999, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});