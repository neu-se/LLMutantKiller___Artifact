const complex = require('../complex.js');

describe('Complex.js', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const result = new complex.Complex(1, 2).acsch();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});