import { Complex } from "../complex";

describe('Complex', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(1.9, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(1.368668937112746, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});