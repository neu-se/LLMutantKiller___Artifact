const Complex = require('./complex');

describe('Complex', () => {
  it('should have a property with its own name', () => {
    expect(Object.keys(Complex)).toContain('Complex');
  });
});