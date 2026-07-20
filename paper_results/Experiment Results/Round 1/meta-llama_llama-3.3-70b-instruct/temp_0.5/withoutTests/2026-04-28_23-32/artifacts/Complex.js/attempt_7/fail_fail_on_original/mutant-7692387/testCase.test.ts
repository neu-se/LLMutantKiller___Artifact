// Assuming the complex.js file is in the same directory as the test file
const Complex = require('./complex.js');

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(Object.keys(result)).not.toContain('');
    expect(() => result[""]).toThrowError();
  });
});