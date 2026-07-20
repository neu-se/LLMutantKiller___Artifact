import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.6636123605477749, 10);
    expect(result.im).toBeCloseTo(-2.437587736496052, 10);
  });
});