import { Complex } from "../../complex";

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(2, 2);
    const result = c1.div(c2);
    if (Math.abs(c2.re) < Math.abs(c2.im)) {
      expect(result.re).toBeCloseTo(0.5, 10);
      expect(result.im).toBeCloseTo(0, 10);
    } else {
      expect(result.re).toBeCloseTo(0.5, 10);
      expect(result.im).toBeCloseTo(0, 10);
    }
  });
});