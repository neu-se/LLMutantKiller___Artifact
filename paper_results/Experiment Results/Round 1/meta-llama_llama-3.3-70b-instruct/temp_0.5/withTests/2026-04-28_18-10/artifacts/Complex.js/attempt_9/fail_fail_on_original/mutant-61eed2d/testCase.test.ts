const Complex = require('../../../../../../subject_repositories/Complex.js/complex.js').Complex;

describe('Complex.js', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(complex['re']).toBeDefined();
    expect(complex['im']).toBeDefined();
    expect(complex).toHaveProperty('re');
    expect(complex).not.toHaveProperty('');
  });
});