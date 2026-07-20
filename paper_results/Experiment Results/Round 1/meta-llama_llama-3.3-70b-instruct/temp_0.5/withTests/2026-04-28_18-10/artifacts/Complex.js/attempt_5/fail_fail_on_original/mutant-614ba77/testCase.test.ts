const Complex = require('../complex.js');

describe('Complex', () => {
  it('should not have an empty string key', () => {
    expect(Object.keys(Complex)).not.toContain('');
  });
});