describe('Complex', () => {
  it('should have a property named Complex', () => {
    const fs = require('fs');
    const code = fs.readFileSync('./complex.js', 'utf8');
    expect(code).toContain('Complex["Complex"] = Complex');
  });
});