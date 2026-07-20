const Complex = require('./complex.js');

describe('Complex', () => {
  it('should have an acot method that is a function', () => {
    const complex = new Complex(1, 2);
    expect(typeof complex.acot).toBe('function');
  });
});