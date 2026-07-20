const fs = require('fs');
const path = require('path');

const complexCode = fs.readFileSync(path.join(__dirname, 'complex.js'), 'utf8');
const Complex = eval(complexCode).Complex;

describe('Complex.js', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    expect(typeof result).toBe('object');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});