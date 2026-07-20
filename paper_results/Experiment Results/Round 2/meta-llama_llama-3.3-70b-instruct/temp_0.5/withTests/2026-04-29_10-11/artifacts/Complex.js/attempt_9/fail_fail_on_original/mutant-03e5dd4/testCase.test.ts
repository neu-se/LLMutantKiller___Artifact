import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    // The mutation changes the condition to check for an empty string instead of a space, tab, or newline
    // So, this test should pass on the original code and fail on the mutated code
    expect(() => new Complex('1+2')).not.toThrow();
  });
});