import { Complex } from '../complex.js';

describe("Complex", () => {
  it("should correctly calculate log for complex numbers", () => {
    const c = new Complex(4, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(4));
    expect(result.im).toBeCloseTo(0);
    const d = new Complex(1, 0);
    const result2 = d.log();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(0);
    const e = new Complex(-1, 0);
    const result3 = e.log();
    expect(result3.re).toBeCloseTo(Math.log(1));
    expect(result3.im).toBeCloseTo(Math.PI);
  });
});