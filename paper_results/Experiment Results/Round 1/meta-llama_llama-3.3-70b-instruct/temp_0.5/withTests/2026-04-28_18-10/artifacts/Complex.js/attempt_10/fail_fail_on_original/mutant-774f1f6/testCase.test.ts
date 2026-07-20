describe('Complex.js', () => {
  it('should correctly parse a complex number', () => {
    const complexJsPath = './complex.js';
    const fs = require('fs');
    const Complex = eval(fs.readFileSync(complexJsPath, 'utf8'));
    const complex = new Complex(1, 2);
    expect(complex).toHaveProperty('re');
    expect(complex).not.toHaveProperty('');
    expect(complex.re).toBe(1);
  });
});