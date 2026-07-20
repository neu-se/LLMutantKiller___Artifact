const Complex = require('../../../../../../../../subject_repositories/Complex.js/complex.js');

describe('Complex', () => {
  it('should export Complex as a module', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(complex.add(3, 4).re).toBe(4);
    expect(complex.add(3, 4).im).toBe(6);
    expect(complex.sub(3, 4).re).toBe(-2);
    expect(complex.sub(3, 4).im).toBe(-2);
    expect(complex.mul(3, 4).re).toBe(-5);
    expect(complex.mul(3, 4).im).toBe(10);
  });
});