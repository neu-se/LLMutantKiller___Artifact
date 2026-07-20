const Complex = require('./complex');

describe('Complex', () => {
  it('should create a complex number with a valid real part', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(complex.toString()).toBe('1 + 2i');
    expect(complex.re).toBeDefined();
    expect(() => complex.re).not.toThrowError();
    expect(Object.keys(complex)).toContain('re');
    expect(complex['re']).toBe(complex.re); // This line should fail on the mutated code
  });
});