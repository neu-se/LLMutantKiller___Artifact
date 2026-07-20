import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers', () => {
    const c = new Complex('3-i');
    expect(c.re).toBeCloseTo(3, 15);
    expect(c.im).toBeCloseTo(-1, 15);
    const d = new Complex('3');
    expect(d.re).toBeCloseTo(3, 15);
    expect(d.im).toBeCloseTo(0, 15);
  });
});