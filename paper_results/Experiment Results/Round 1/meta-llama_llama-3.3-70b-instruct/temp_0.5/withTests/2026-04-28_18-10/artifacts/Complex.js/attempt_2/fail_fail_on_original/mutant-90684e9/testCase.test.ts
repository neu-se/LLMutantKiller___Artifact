import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should clone a complex number correctly', () => {
    const original = new Complex(1, 2);
    const clone = original.clone();
    expect(clone.re).toBe(original.re);
    expect(clone.im).toBe(original.im);
    // Test that the clone is a new object, not the same as the original
    clone.re = 3;
    expect(original.re).not.toBe(clone.re);
  });
});