import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const c = new Complex(2, 0);
    const result = c.asec();
    const expected = new Complex(
      Math.acos(1/2),
      0
    );
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});