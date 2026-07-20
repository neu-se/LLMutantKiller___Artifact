const fs = require('fs');
const path = require('path');

const complexCode = fs.readFileSync(path.join(__dirname, '../complex.js'), 'utf8');
const Complex = eval(complexCode).Complex;

describe('Complex.js', () => {
  it('should have a cosh function', () => {
    const complexInstance = new Complex(1, 0);
    expect(typeof complexInstance.cosh).toBe('function');
  });

  it('should throw an error when cosh is called on the mutated code', () => {
    const complexInstance = new Complex(1, 0);
    expect(() => complexInstance.cosh()).toThrowError();
  });
});