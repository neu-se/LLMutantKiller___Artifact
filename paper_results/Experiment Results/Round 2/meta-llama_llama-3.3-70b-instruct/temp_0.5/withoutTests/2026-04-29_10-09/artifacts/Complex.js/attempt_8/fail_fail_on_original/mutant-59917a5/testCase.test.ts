import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for a = 1 and b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.im).not.toBeCloseTo(0, 15);
  });
});