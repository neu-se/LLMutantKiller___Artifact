import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});