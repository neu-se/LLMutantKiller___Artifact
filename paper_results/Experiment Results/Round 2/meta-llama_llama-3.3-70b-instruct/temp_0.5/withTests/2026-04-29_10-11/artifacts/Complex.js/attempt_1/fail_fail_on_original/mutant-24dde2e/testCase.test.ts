import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(1, 2);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 10);
    expect(result.im).toBeCloseTo(0.46364760900080615, 10);
  });
});