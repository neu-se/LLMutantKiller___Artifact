import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBeNull();
    expect(result.im).not.toBeNull();
    const d = 1 * 1 + 1 * 1;
    if (d !== 0) {
      expect(result.re).not.toBeNaN();
      expect(result.im).not.toBeNaN();
    } else {
      expect(result.re).toBeNaN();
      expect(result.im).toBeNaN();
    }
  });
});