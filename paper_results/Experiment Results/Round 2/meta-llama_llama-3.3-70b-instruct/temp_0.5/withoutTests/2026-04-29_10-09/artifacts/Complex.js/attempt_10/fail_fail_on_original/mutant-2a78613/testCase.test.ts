describe('Complex', () => {
  it('should throw an error when multiplying two real complex numbers with an empty return statement in the mutated code', () => {
    const Complex = require('./complex.js').Complex;
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result).not.toBeUndefined();
  });
});