const fs = require('fs');
const complexCode = fs.readFileSync('./complex.js', 'utf8');

describe('Complex', () => {
  it('should have im property initialized when created with undefined input', () => {
    const Complex = eval(complexCode);
    const complex = new Complex();
    expect(Object.keys(complex)).toContain('im');
    expect(complex.im).toBe(0);
    expect(Object.keys(complex)).not.toContain('');
  });
});