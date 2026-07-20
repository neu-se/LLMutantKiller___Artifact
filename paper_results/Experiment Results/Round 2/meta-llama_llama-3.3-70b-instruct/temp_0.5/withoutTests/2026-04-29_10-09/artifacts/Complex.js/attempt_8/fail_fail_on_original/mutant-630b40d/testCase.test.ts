const fs = require('fs');

describe('hypot', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const complexCode = fs.readFileSync('./complex.js', 'utf8');
    const hypotFunction = eval(complexCode + '; hypot');
    expect(hypotFunction(3001, 0)).toBeCloseTo(3001);
    expect(hypotFunction(0, 3001)).toBeCloseTo(3001);
  });
});