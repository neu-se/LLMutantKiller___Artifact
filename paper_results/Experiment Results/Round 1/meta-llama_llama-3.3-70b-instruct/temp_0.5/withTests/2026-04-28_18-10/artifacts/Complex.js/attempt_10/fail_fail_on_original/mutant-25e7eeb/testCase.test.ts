import { Complex } from "./complex";

describe('Complex', () => {
  it('should multiply two complex numbers correctly', () => {
    const c = new Complex(1, 0);
    const d = new Complex(3, 0);
    const result = c.mul(d);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(0);
  });
});