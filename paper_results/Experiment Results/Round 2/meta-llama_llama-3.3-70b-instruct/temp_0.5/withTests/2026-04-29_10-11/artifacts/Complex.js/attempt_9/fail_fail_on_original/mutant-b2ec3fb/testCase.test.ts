const Complex = require('./complex').Complex;

describe('Complex', () => {
  it('should correctly floor the real part of a complex number', () => {
    const complex = new Complex(10.5, 0);
    const floored = complex.floor(0);
    expect(floored.re).toBe(10);
    expect(floored.im).toBe(0);
    expect(typeof floored.re).toBe('number');
    expect(!isNaN(floored.re)).toBe(true);
  });
});