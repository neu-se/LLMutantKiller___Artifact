describe('Complex', () => {
  it('should handle the parsing of complex numbers correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complexNumber = new Complex('2-1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
  });
});