describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 1);
    const result = complex.asec();
    const expectedRe = Math.PI / 2 - Math.atan2(1, 1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});