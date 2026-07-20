import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const c = new Complex(3001, 3000);
    const result = c.abs();
    expect(result).toBeCloseTo(Math.sqrt(3001*3001 + 3000*3000), 10);
    const c2 = new Complex(3000, 3000);
    const result2 = c2.abs();
    expect(result2).toBeCloseTo(Math.sqrt(3000*3000 + 3000*3000), 10);
    expect(result).not.toBeCloseTo(result2, 10);
  });
});