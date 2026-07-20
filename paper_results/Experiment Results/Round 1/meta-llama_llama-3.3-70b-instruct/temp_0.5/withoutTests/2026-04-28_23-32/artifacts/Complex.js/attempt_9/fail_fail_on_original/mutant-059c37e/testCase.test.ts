describe('Complex', () => {
  it('should return the correct value for atan when a is 0 and b is -1', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(result.im).toBeLessThan(0);
  });
});