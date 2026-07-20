import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});