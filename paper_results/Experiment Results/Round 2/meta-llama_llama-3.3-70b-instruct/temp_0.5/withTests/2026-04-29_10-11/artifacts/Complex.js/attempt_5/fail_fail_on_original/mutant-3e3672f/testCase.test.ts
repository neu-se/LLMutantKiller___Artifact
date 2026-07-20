import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers with "i" notation and fail with "I" notation in the mutated code', () => {
    const complexI = new Complex('1+i');
    expect(complexI.re).toBe(1);
    expect(complexI.im).toBe(1);
    const complexLowercaseI = new Complex('1+I');
    expect(complexLowercaseI.re).toBe(1);
    expect(complexLowercaseI.im).toBe(1);
  });
});