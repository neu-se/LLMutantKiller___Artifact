const Complex = require('./complex.js');

describe('Complex', () => {
  it('should correctly calculate asinh and not throw an error', () => {
    const c = new Complex(1, 2);
    expect(() => c.asinh()).not.toThrow();
  });
});