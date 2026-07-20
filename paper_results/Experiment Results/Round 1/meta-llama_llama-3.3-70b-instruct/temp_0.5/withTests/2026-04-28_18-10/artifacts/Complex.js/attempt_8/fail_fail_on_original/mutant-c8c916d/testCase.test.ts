import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acsc function', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.toString()).not.toBe('0 0i');
  });
});