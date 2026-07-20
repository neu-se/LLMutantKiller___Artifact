const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should calculate the hypotenuse correctly for large values', () => {
    const complex1 = new Complex(3001, 1);
    const result1 = complex1.abs();
    expect(result1).toBeCloseTo(Math.sqrt(3001 * 3001 + 1 * 1), 10);

    const complex2 = new Complex(1, 3001);
    const result2 = complex2.abs();
    expect(result2).toBeCloseTo(Math.sqrt(1 * 1 + 3001 * 3001), 10);
  });
});