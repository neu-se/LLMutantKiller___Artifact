import { Complex } from './complex';

describe('Complex.js', () => {
  it('should correctly parse complex numbers with "i" notation and "I" notation', () => {
    const complexI = new Complex('1+i');
    const complexLowercaseI = new Complex('1+I');
    expect(complexI.re).toBe(1);
    expect(complexI.im).toBe(1);
    expect(complexLowercaseI.re).toBe(1);
    expect(complexLowercaseI.im).toBe(1);
  });
});