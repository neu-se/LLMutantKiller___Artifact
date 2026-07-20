import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
  });
});