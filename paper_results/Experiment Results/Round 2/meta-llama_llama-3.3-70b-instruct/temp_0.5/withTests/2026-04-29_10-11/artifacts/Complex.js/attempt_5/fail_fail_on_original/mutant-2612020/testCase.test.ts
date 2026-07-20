const Complex = require('../../../../complex.js');

describe('Complex', () => {
  it('should create a complex number with a valid real part', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(complex.toString()).toBe('1 + 2i');
    expect(Object.keys(complex).includes('re')).toBe(true); 
    expect(complex.re).toBeDefined(); // This line should fail on the mutated code because 're' is replaced with an empty string
  });
});