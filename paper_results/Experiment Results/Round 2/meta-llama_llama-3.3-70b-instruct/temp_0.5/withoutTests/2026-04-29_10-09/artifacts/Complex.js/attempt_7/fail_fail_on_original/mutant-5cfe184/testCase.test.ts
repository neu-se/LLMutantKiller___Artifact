import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for a complex number', () => {
    const c = new Complex(1.1, 0);
    const result = c.atanh();
    expect(result.im).toBeCloseTo(0, 10);
  });
});