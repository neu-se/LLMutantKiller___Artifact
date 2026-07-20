import { Complex } from '../complex.js';

describe("Complex", () => {
  it("should correctly calculate log for positive real numbers", () => {
    const c = new Complex(4, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(4));
    expect(result.im).toBeCloseTo(0);
  });
});