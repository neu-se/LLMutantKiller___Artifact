const fs = require('fs');
const path = require('path');
const complexJsPath = path.join(__dirname, './complex.js');
const complexJsContent = fs.readFileSync(complexJsPath, 'utf8');
const Complex = eval(complexJsContent);

describe('Complex.js', () => {
  it('should correctly parse a complex number', () => {
    const complex = new Complex(1, 2);
    expect(complex).toHaveProperty('re');
    expect(complex).not.toHaveProperty('');
    expect(complex.re).toBe(1);
  });
});