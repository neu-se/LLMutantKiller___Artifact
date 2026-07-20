import { Complex } from "../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for small numbers', () => {
    const c = new Complex(1, 1);
    const result = c.abs();
    expect(result).toBeCloseTo(Math.sqrt(2), 10);
  });

  // it('should calculate hypot correctly for large numbers', () => {
  //   const c = new Complex(3000, 3001);
  //   const result = c.abs();
  //   expect(result).toBeCloseTo(Math.sqrt(3000*3000 + 3001*3001), 10);
  // });
});