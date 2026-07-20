const fs = require('fs');
const path = require('path');

const complexCode = fs.readFileSync(path.join(__dirname, './complex.js'), 'utf8');
eval(complexCode);

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeCloseTo(0, 10);
  });
});