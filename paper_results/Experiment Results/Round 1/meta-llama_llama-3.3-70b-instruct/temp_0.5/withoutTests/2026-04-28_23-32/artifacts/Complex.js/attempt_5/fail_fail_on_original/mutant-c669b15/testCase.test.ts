import { Complex } from "../../../../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});