const Complex = require('./complex.js');

describe('Complex', () => {
  it('should have a defined __esModule property with correct name', () => {
    expect(Object.keys(Complex)).toContain('__esModule');
    expect(Object.getOwnPropertyDescriptor(Complex, '__esModule')).toBeDefined();
  });
});