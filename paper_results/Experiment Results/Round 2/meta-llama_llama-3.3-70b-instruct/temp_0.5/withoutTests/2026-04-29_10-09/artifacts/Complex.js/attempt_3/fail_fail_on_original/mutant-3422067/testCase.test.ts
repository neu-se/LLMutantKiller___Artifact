import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the hypotenuse correctly', () => {
    const complex = new Complex(3000, 3001);
    const result = complex.abs();
    expect(result).toBeCloseTo(4242.640768961651, 4);
  });
});