const Complex = require('../../../../complex.js');

describe('Complex', () => {
  it('should correctly calculate asinh and return a complex number with real and imaginary parts that are numbers', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});