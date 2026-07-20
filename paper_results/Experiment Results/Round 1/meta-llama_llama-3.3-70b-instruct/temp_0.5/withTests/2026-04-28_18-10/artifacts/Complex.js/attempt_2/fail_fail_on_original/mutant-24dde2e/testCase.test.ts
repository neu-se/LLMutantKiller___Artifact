import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const c = new Complex(1, 0);
    const result = c.asec();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});