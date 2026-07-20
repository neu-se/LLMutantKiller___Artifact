import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly handle subtraction of an infinite complex number from another infinite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 2);
    expect(c1.sub(c2).isInfinite()).toBe(true);
    const c3 = new Complex(Infinity, Infinity);
    expect(c1.sub(c3).isNaN()).toBe(true);
    expect(c3.sub(c1).isInfinite()).toBe(false); // This line should fail on the mutated code
  });
});