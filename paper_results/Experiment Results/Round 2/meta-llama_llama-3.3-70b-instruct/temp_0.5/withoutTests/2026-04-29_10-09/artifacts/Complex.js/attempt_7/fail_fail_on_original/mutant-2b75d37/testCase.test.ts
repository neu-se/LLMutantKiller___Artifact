import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should have an acot function that does not throw an error and returns a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBeCloseTo(0.46364760900080615, 5);
    expect(result.im).toBeCloseTo(-0.46364760900080615, 5);
  });
});