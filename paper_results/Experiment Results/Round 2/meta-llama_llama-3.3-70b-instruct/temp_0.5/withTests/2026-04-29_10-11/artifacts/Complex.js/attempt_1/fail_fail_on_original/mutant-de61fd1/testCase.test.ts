import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.2653877118358836, 10);
    expect(result.im).toBeCloseTo(-0.2422489686302943, 10);
  });
});