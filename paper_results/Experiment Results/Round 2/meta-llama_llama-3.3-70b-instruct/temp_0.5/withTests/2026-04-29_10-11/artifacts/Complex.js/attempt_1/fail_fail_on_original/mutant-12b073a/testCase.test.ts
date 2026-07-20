import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate sinh correctly', () => {
    const complex = new Complex(1, 0);
    const sinh = complex.sinh();
    expect(sinh.re).toBeCloseTo(1.1752011660461475);
    expect(sinh.im).toBeCloseTo(0);
  });
});