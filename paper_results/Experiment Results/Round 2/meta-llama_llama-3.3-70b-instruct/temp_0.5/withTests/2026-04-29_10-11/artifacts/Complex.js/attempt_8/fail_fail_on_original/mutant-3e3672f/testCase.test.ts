describe('Complex.js', () => {
  it('should correctly parse complex numbers with "i" notation and fail with "I" notation in the mutated code', () => {
    const Complex = require('../complex').Complex;
    const complexI = new Complex('1+i');
    expect(complexI.re).toBe(1);
    expect(complexI.im).toBe(1);
    const complexCapitalI = new Complex('1+I');
    expect(complexCapitalI.re).toBe(1);
    expect(complexCapitalI.im).toBe(1);
  });
});