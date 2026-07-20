import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});