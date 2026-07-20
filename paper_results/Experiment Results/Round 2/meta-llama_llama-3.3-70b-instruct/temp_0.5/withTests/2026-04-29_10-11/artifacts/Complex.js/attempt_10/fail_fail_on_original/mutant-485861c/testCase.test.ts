const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should have an im property equal to 0 when created with no arguments', () => {
    const complex = new Complex();
    expect(complex.im).toBe(0);
  });
});