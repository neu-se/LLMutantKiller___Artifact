import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly for the original code', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(result.re).toBeCloseTo(-0.03086674725427066, 5);
    expect(result.im).toBeCloseTo(-0.03341640786821245, 5);
  });
});