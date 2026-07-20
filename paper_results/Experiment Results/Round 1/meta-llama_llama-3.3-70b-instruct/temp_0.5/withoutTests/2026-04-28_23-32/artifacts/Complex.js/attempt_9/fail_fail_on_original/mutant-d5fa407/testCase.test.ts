import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent for a specific case', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.im).not.toBe(0);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acot();
    expect(result2.im).not.toBe(0);
  });
});