import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex1 = new Complex(3000, 3000);
    const complex2 = new Complex(3000, 3001);
    expect(complex1.abs()).toBeCloseTo(Math.sqrt(3000*3000 + 3000*3000), 1e-15);
    expect(complex2.abs()).toBeCloseTo(Math.sqrt(3000*3000 + 3001*3001), 1e-15);
  });
});