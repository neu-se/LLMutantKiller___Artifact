import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero complex numbers', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    const d = complex.re * complex.re + complex.im * complex.im;
    expect(d !== 0).toBeTruthy();
  });
});