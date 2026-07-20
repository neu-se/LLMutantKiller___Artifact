import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acsc correctly for zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});