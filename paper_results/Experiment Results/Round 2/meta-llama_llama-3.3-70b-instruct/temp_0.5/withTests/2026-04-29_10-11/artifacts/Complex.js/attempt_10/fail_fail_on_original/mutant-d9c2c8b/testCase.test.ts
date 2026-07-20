describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const Complex = require('../complex').Complex;
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});