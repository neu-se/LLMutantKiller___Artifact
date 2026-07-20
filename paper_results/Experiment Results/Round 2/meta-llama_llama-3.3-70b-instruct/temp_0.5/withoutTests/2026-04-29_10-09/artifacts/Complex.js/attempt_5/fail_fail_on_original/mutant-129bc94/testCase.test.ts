const Complex = require('./complex.js');

describe('Complex', () => {
  it('should have a property with its own name', () => {
    expect(Object.keys(Complex)).toContain('Complex');
    expect(Object.keys(Complex)).not.toContain('');
  });
});