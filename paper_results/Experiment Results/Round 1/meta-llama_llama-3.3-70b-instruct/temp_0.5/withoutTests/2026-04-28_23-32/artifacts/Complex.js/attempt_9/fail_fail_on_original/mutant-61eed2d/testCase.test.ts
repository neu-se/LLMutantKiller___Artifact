const Complex = require('../complex.js').Complex;

describe('Complex', () => {
  it('should correctly parse a complex number from a string and have a "re" property', () => {
    const c = new Complex('1+2i');
    expect(c).toHaveProperty('re');
    expect(c.re).toBe(1);
  });
});