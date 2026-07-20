const Complex = require('../../complex.js');

describe('Complex', () => {
  it('should have a property with its own name', () => {
    expect(Object.prototype.hasOwnProperty.call(Complex, 'Complex')).toBe(true);
  });
});