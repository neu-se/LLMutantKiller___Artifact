import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for a > 1 and b === 0', () => {
    const complex = new Complex(1.00001, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 15);
  });
});