describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const Complex = require('../complex.js').Complex;
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});