const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should calculate abs correctly for small numbers', () => {
    const complex = new Complex(1, 1);
    expect(complex.abs()).toBeCloseTo(Math.sqrt(2));
  });
});