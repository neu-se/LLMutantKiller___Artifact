import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero complex numbers', () => {
    const complex = new Complex(1, 2);
    const d = complex.re * complex.re + complex.im * complex.im;
    const result = complex.acsc();
    if (d !== 0) {
      expect(result.re).not.toBeNaN();
      expect(result.im).not.toBeNaN();
    } else {
      expect(result.re).toBeNaN();
      expect(result.im).toBeNaN();
    }
  });
});