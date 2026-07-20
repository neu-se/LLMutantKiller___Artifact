import { Complex } from './complex';

describe('Complex.js', () => {
  it('should correctly parse complex numbers', () => {
    const c = new Complex('3-i');
    expect(c.re).toBeCloseTo(3, 15);
    expect(c.im).toBeCloseTo(-1, 15);
    const d = new Complex('3i');
    expect(d.re).toBeCloseTo(0, 15);
    expect(d.im).toBeCloseTo(3, 15);
    const e = new Complex('3');
    expect(e.re).toBeCloseTo(3, 15);
    expect(e.im).toBeCloseTo(0, 15);
    const f = new Complex('i');
    expect(f.re).toBeCloseTo(0, 15);
    expect(f.im).toBeCloseTo(1, 15);
  });
});