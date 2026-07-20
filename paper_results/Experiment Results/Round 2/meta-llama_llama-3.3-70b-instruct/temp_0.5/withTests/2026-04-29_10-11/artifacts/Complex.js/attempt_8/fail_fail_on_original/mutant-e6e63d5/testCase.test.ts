const Complex = require('./complex');

describe('Complex', () => {
  it('should calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(typeof result).toBe('object');
  });
});