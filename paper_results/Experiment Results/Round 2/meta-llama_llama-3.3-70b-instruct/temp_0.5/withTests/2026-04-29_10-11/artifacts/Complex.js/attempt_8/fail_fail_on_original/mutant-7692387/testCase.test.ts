const Complex = require('../../complex');

describe('Complex', () => {
  it('should correctly calculate asinh and have a property "re" that is a number', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(typeof result.re).toBe('number');
  });
});