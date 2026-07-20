import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should not return 0 π/2 for acoth when a is 0 and b is 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acoth();
    expect(result.toString()).not.toBe('0 π/2');
  });
});