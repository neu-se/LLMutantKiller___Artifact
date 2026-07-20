import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should clone correctly', () => {
    const original = new Complex(1, 2);
    const clone = original.clone();
    expect(clone.re).toBe(original.re);
    expect(clone.im).toBe(original.im);
    // Change the original to verify that the clone is a deep copy
    original.re = 3;
    original.im = 4;
    expect(clone.re).not.toBe(original.re);
    expect(clone.im).not.toBe(original.im);
  });
});