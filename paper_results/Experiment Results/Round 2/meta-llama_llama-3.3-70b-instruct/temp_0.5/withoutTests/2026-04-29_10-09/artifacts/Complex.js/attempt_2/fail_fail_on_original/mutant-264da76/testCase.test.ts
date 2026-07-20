import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(2, 3);
    const result = complex.acoth();
    const expected = new Complex(2/13, -3/13).atanh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});