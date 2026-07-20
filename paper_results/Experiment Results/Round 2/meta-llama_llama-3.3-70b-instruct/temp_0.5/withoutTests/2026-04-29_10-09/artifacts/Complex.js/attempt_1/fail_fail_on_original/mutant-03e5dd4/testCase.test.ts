import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('3+4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(4);

    // Test with whitespace in the string
    const complexWithWhitespace = new Complex(' 3 + 4 i ');
    expect(complexWithWhitespace.re).toBe(3);
    expect(complexWithWhitespace.im).toBe(4);
  });
});