import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle atan with b equal to 1 and a equal to 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});