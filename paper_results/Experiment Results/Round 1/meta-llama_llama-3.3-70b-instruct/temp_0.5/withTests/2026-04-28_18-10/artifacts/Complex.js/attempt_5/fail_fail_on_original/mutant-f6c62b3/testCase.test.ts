const Complex = require('./complex.js');

describe('Complex.js', () => {
  it('should have the correct export properties', () => {
    expect(Object.keys(Complex).length).toBeGreaterThan(0);
    expect(Object.keys(Complex)).not.toContain('');
  });
});