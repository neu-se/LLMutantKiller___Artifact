// Assuming the complex.js file is in the same directory
const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should throw an error when multiplying two complex numbers with an empty property', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(() => result[""]).toThrow();
  });
});