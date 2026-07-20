import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1.5, 2.5);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 10);
    expect(result.im).toBeCloseTo(-1.3258176636680326, 10);
  });
});