import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1.2e+3i');
    expect(complexNumber.re).toBe(0);
    expect(complexNumber.im).toBe(1200);
  });
});