import { Complex } from "./complex";

describe('Complex', () => {
  it('should return Infinity when adding Infinity to any complex number', () => {
    const infinity = new Complex(Infinity, 0);
    const complex = new Complex(1, 2);
    const result = infinity.add(complex);
    expect(result.isInfinite()).toBe(true);
  });

  it('should not return NaN when adding Infinity to any complex number', () => {
    const infinity = new Complex(Infinity, 0);
    const complex = new Complex(1, 2);
    const result = infinity.add(complex);
    expect(result.isNaN()).toBe(false);
  });
});