const Complex = require('../complex');

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-0.7853981633974483);
    expect(result.im).toBeCloseTo(0);
  });
});