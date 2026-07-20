import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should test the behavior of the mutated file in a way that reliably detects the mutation', () => {
    const complex = new Complex(0, 1);
    expect(complex.acsc().re).toBeCloseTo(Math.PI / 2, 10);
    expect(complex.acsc().im).toBeCloseTo(0, 10);
  });
});