import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly handle subtraction of two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, 0);
    expect(c1.sub(c2).toString()).toBe('Infinity');
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(Infinity, Infinity);
    expect(c3.sub(c4).toString()).not.toBe('Infinity');
  });
});