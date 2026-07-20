import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(2, 3);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(-0.4636476090008061);
    expect(result.im).toBeCloseTo(-0.3665129205816643);
  });
});