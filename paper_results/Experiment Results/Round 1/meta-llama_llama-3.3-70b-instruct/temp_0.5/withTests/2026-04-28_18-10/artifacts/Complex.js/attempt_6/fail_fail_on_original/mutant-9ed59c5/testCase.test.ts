const fs = require('fs');

describe('Complex.js', () => {
  it('should contain the define function call', () => {
    const content = fs.readFileSync('./complex.js', 'utf8');
    expect(content).toContain('define([], function() { return Complex; });');
  });
});