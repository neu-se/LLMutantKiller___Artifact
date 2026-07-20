const fs = require('fs');
const path = require('path');

const complexCode = fs.readFileSync(path.join(__dirname, 'complex.js'), 'utf8');
const Complex = eval(complexCode).Complex;

describe('Complex.js', () => {
  it('should throw an error when cosh is not implemented', () => {
    const complexInstance = new Complex(1, 0);
    const coshSpy = jest.spyOn(complexInstance, 'cosh');
    coshSpy.mockImplementation(() => {});
    expect(() => complexInstance.cosh()).toThrowError();
    coshSpy.mockRestore();
  });
});