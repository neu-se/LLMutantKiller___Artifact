const fs = require('fs');
const path = require('path');

const complexCode = fs.readFileSync(path.join(__dirname, 'complex.js'), 'utf8');

describe('Complex', () => {
  it('should have an acot method that is a function', () => {
    const acotMethod = complexCode.includes('acot: function');
    expect(acotMethod).toBe(true);
  });
});