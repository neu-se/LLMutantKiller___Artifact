import { Complex } from "../complex";

describe('Complex', () => {
  it('should multiply two complex numbers correctly', () => {
    const c = new Complex(1, 0);
    const d = new Complex(3, 0);
    const result = c.mul(d);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(0);
    const e = new Complex(1, 2);
    const f = new Complex(3, 0);
    const result2 = e.mul(f);
    expect(result2.re).toBeCloseTo(3);
    expect(result2.im).toBeCloseTo(2);
  });
});