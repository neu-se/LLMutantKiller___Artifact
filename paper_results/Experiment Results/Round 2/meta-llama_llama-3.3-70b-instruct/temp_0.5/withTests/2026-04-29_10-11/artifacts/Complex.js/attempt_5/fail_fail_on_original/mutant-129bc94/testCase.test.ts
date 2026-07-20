describe('Complex', () => {
  it('should have a property named Complex', () => {
    const Complex = require('../complex.js');
    expect(Object.keys(Complex)).toContain('Complex');
    expect(Complex['Complex']).toBe(Complex);
  });
});