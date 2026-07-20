import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly handle subtraction of two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2).toString()).toBe('NaN');
    const c3 = new Complex(1, 1);
    const c4 = new Complex(Infinity, Infinity);
    expect(c3.sub(c4).toString()).toBe('Infinity');
  });
});