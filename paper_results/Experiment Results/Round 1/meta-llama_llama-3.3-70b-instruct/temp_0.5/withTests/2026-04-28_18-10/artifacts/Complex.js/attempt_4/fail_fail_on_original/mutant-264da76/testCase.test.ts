import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    const expected = complex.acoth();
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});