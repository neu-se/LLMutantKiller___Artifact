import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    const acot = complex.acot();
    expect(acot.re).toBeCloseTo(-0.46364760900080615, 10);
    expect(acot.im).toBeCloseTo(-0.46364760900080615, 10);
  });
});