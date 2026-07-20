const Complex = require('./complex.js');

describe('Complex', () => {
  it('should export Complex as a module', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});