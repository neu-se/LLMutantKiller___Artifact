import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0.6666666666666666, 10);
    expect(result.im).toBeCloseTo(-0.7853981633974483, 10);
  });
});