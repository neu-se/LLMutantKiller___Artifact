const complex = require('./complex.js');

describe('Complex', () => {
  it('should correctly parse a complex number from a string and have a "re" property', () => {
    const c = new complex.Complex('1+2i');
    expect(c).toHaveProperty('re');
    expect(c.re).toBe(1);
  });
});