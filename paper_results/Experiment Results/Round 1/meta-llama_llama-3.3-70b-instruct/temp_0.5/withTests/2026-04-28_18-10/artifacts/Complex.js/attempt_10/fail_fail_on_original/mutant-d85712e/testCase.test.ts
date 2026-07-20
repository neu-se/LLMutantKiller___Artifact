describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const Complex = require('../complex.js').Complex;
    const complexNumber = new Complex('3+4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
    expect(() => new Complex('3+Stryker was here!i')).toThrowError();
  });
});