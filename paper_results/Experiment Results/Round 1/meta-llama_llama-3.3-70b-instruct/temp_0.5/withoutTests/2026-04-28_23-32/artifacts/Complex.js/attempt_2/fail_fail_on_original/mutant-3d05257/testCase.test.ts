import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const c = new Complex({ re: 1, im: 0 });
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});