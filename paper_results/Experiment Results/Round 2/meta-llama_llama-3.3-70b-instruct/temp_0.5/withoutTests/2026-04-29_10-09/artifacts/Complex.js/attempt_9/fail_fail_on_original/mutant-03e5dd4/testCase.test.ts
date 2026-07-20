import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('3+4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(4);

    // Test with an empty string in the mutated code
    const complexWithEmptyString = new Complex('');
    expect(complexWithEmptyString.re).not.toBe(3);
    expect(complexWithEmptyString.im).not.toBe(4);
  });
});