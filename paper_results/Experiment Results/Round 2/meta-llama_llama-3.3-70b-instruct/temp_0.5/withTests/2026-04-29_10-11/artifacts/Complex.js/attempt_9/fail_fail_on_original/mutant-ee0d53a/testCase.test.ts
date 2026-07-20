import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const c = new Complex(3000, 3000);
    const result = c.abs();
    expect(result).toBeCloseTo(Math.sqrt(3000*3000 + 3000*3000), 10);
  });
});