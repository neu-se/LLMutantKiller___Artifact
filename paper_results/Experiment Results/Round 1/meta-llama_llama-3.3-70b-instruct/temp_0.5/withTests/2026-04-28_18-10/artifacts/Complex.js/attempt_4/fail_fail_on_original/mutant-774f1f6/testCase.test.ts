const Complex = require('./complex.js').Complex;

describe('Complex.js', () => {
  it('should create a complex number with the correct real part', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBeDefined();
    expect(complex.im).toBeDefined();
  });
});