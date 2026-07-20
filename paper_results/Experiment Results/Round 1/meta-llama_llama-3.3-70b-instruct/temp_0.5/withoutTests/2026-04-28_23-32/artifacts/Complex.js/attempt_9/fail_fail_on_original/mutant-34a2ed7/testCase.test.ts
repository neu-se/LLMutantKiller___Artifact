describe('Complex', () => {
  it('should correctly parse a complex number from a string', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const invalidComplex = new Complex('1a');
    expect(invalidComplex.re).toBeNaN();
    expect(invalidComplex.im).toBeNaN();
  });
});