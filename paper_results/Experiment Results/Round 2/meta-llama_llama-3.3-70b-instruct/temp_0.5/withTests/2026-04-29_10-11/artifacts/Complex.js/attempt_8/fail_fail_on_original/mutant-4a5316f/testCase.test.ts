import { Complex } from "../../../complex";

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    const a = complex.re;
    const b = complex.im;
    const d = a * a + b * b;
    const expected = (d !== 0)
      ? new Complex(
        a / d,
        -b / d).atanh()
      : new Complex(
        (a !== 0) ? a / 0 : 0,
        (b !== 0) ? -b / 0 : 0).atanh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    expect(result.im).not.toBeCloseTo(-expected.im, 10); // This line should cause the test to fail on the mutated code
  });
});