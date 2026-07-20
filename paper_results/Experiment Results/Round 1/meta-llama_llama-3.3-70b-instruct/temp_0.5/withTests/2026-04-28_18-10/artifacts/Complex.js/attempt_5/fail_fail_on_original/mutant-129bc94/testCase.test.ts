const Complex = require('./complex.js');

describe('Complex', () => {
  it('should have a property named Complex that references itself', () => {
    expect(Object.keys(Complex)).toContain('Complex');
  });
});