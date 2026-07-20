const Complex = require('../complex.js').Complex;

describe('Complex', () => {
  it('should correctly parse a complex number string "i"', () => {
    const complex = new Complex('i');
    expect(complex.re).toBeCloseTo(0);
    expect(complex.im).toBeCloseTo(1);
  });
});