const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should calculate abs correctly for large numbers', () => {
    expect(new Complex(3001, 0).abs()).toBeCloseTo(3001);
    expect(new Complex(0, 3001).abs()).toBeCloseTo(3001);
  });
});