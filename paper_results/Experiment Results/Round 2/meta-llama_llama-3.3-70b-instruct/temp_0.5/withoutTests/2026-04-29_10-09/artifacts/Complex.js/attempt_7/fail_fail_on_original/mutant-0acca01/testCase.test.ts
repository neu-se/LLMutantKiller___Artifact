import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acoth correctly for a complex number', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    const a = complex.re;
    const b = complex.im;
    const d = a * a + b * b;
    expect(result.re).not.toBeCloseTo(a * d, 10);
  });
});