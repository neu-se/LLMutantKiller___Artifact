import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have the correct asinh method', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).toHaveProperty('im');
    expect(result.im).not.toBeUndefined();
  });
});