const Complex = require('./complex.js');

describe('Complex', () => {
  it('should have a default export', () => {
    expect(Complex.default).toBeDefined();
    expect(Complex.default).toBe(Complex);
  });

  it('should not have an empty string key', () => {
    const keys = Object.keys(Complex);
    expect(keys.includes("")).toBe(false);
  });
});