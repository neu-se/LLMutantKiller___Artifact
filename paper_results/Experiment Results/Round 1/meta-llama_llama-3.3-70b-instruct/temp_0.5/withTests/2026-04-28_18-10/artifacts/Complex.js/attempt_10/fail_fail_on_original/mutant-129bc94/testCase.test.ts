const Complex = require('./complex.js');

describe('Complex', () => {
  it('should not have an empty string as a key', () => {
    const keys = Object.keys(Complex);
    expect(keys).not.toContain('');
  });
});