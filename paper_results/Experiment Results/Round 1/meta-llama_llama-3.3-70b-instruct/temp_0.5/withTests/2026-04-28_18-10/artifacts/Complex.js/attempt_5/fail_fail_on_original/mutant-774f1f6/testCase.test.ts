const Complex = require('./complex.js').Complex;

describe('Complex.js', () => {
  it('should correctly parse a complex number', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});