import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex Number Parser', () => {
  it('should correctly parse complex numbers with "i" and "I" suffixes', () => {
    const c1 = new Complex('1i');
    const c2 = new Complex('1I');
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(1);
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(1);

    // Test with mutated code should fail here
    const c3 = new Complex('1');
    expect(c3.im).not.toBe(1);
  });
});