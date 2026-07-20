import { Complex } from '../../complex.js';

describe('Complex Number Parser', () => {
  it('should correctly parse complex numbers with "i" and "I" suffixes', () => {
    const c1 = new Complex('1i');
    const c2 = new Complex('1I');
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(1);
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(1);

    // Test case to check if the mutation is correctly identified
    const c3 = new Complex('');
    expect(c3.im).toBe(0);
  });
});