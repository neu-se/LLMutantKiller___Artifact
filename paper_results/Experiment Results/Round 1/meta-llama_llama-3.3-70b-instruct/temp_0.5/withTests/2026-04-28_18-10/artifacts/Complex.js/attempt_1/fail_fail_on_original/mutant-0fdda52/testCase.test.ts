import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the magnitude of a complex number', () => {
    const complexNumber = new Complex(3, 4);
    expect(complexNumber.abs()).toBeCloseTo(5);
  });
});