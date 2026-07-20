import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acsch correctly for a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});