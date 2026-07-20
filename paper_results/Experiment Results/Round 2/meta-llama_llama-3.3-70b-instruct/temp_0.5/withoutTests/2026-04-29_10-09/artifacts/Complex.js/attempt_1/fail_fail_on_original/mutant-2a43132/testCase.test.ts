import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(1, 1);
    const asec = complex.asec();
    expect(asec.re).toBeCloseTo(-0.48121182505960347);
    expect(asec.im).toBeCloseTo(-1.5707963267948966);
  });
});