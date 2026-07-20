import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle atanh calculation for a = -1', () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Infinity, 10);
  });

  it('should correctly handle atanh calculation for a = -1 with a !== -1 condition', () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    if (complex.re !== -1) {
      expect(result.re).toBeCloseTo(0, 10);
      expect(result.im).toBeCloseTo(-Infinity, 10);
    } else {
      expect(result.re).toBeCloseTo(0, 10);
      expect(result.im).toBeCloseTo(-Infinity, 10);
    }
  });
});