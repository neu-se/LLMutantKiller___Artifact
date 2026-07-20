import { Complex } from "../complex";

describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers with no imaginary part', () => {
    const c = new Complex(2, 0);
    const result = c.atanh();
    const expected = new Complex(0.5493061443340548, 0);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});