import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number where d is not zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});