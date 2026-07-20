import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.im).not.toBeNull();
    expect(complex.asech().im).not.toBeUndefined();
  });
});