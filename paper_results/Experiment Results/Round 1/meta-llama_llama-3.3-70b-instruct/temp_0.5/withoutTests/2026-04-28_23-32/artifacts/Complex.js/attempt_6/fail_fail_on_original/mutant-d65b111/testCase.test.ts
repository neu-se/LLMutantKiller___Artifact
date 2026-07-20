const Complex = require('../complex.js').Complex;

describe('Complex', () => {
  it('should calculate asech correctly', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.asech();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeLessThan(0);
  });
});