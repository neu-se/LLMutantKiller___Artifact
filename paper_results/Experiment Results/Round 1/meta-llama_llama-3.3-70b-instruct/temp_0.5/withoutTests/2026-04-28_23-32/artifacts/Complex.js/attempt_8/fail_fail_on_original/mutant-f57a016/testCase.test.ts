import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const c = new Complex('1+2i');
    expect(c.re).toBeCloseTo(1);
    expect(c.im).toBeCloseTo(2);
    const d = new Complex('3');
    expect(d.re).toBeCloseTo(3);
    expect(d.im).toBeCloseTo(0);
    const e = new Complex('4i');
    expect(e.re).toBeCloseTo(0);
    expect(e.im).toBeCloseTo(4);
    const f = new Complex('5+');
    expect(f.re).toBeCloseTo(0);
    expect(f.im).toBeCloseTo(0);
  });
});