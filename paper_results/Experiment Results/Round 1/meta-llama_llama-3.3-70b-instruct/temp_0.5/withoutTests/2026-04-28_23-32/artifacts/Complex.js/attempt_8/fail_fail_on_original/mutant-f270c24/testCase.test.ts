import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});