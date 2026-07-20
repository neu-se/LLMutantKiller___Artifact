const fs = require('fs');
const path = require('path');

const complexCode = fs.readFileSync(path.join(__dirname, 'complex.js'), 'utf8');
eval(complexCode);

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const c = new Complex(1, 2);
    const result = c.acsch();
    expect(result.im).toBeLessThan(0);
  });
});