import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('2-1i');
    expect(complexNumber.re).toBeCloseTo(2);
    expect(complexNumber.im).toBeCloseTo(-1);
  });
});