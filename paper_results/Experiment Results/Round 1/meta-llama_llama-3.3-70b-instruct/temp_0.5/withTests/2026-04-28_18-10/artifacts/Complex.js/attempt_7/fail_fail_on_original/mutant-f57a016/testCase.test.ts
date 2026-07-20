describe('Complex.js', () => {
  it('should correctly parse complex numbers', () => {
    const Complex = require('../../complex.js');
    const c = new Complex('3-i');
    expect(c.re).toBeCloseTo(3, 15);
    expect(c.im).toBeCloseTo(-1, 15);
    const d = new Complex('3');
    expect(d.re).toBeCloseTo(3, 15);
    expect(d.im).toBeCloseTo(0, 15);
    const e = new Complex('i');
    expect(e.re).toBeCloseTo(0, 15);
    expect(e.im).toBeCloseTo(1, 15);
    const f = new Complex('3+');
    expect(f.re).toBeCloseTo(3, 15);
    expect(f.im).toBeCloseTo(0, 15);
    const g = new Complex('3+i');
    expect(g.re).toBeCloseTo(3, 15);
    expect(g.im).toBeCloseTo(1, 15);
    const h = new Complex('3-i');
    expect(h.re).toBeCloseTo(3, 15);
    expect(h.im).toBeCloseTo(-1, 15);
  });
});