import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex1 = new Complex(3000, 3001);
    const complex2 = new Complex(3001, 3000);
    expect(complex1.abs()).toBeCloseTo(complex2.abs());
  });
});