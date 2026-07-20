import { Complex } from './complex';

describe('Complex.js', () => {
  it('should correctly parse complex numbers', () => {
    const c = new Complex('3+');
    expect(c.re).toBeCloseTo(3, 15);
    expect(c.im).toBeCloseTo(0, 15);
    const d = new Complex('3');
    expect(d.re).toBeCloseTo(3, 15);
    expect(d.im).toBeCloseTo(0, 15);
    const e = new Complex('i');
    expect(e.re).toBeCloseTo(0, 15);
    expect(e.im).toBeCloseTo(1, 15);
  });
});