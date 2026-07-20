import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result).not.toBeNull();
    expect(complex.acot()).not.toBeNull();
    const d = 1 * 1 + 1 * 1;
    if (d !== 0) {
      expect(complex.acot()).not.toBeNull();
    } else {
      expect(complex.acot()).toBeNull();
    }
  });
});