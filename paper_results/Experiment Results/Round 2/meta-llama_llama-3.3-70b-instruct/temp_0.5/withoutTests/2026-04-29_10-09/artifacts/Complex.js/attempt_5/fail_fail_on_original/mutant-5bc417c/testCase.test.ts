import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for complex numbers', () => {
    const complex = new Complex(0, 0);
    const result = complex.acoth();
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});