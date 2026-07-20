const fs = require('fs');
const path = require('path');

const complexCode = fs.readFileSync(path.join(__dirname, 'complex.js'), 'utf8');
const Complex = eval(complexCode).Complex;

describe('Complex', () => {
  it('should throw an error when parsing an empty string', () => {
    expect(() => new Complex('')).toThrowError();
  });
});