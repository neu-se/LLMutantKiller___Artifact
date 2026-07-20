import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBeCloseTo(1);
    expect(complexNumber.im).toBeCloseTo(2);
  });
});