const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should calculate acsch correctly for a = 1', () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.im).toBeCloseTo(Infinity, 10);
  });

  it('should calculate acsch correctly for a != 0', () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).toBeCloseTo(0, 10);
  });
});