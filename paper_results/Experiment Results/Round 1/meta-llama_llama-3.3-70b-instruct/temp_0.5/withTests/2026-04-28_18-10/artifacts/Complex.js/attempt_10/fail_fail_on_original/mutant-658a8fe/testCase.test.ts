describe('Complex.js', () => {
  it('should return the correct result for the acsch function when d is zero', () => {
    const Complex = require('./complex').Complex;
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});