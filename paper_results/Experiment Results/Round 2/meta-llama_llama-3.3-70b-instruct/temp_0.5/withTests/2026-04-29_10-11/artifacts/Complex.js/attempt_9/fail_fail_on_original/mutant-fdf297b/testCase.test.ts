import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly handle subtraction of two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2).isNaN()).toBe(true);
    const c3 = new Complex(1, 2);
    expect(c1.sub(c3).isInfinite()).toBe(true);
    const c4 = new Complex(Infinity, Infinity);
    expect(c4.sub(c1).isInfinite()).toBe(false); 
  });
});