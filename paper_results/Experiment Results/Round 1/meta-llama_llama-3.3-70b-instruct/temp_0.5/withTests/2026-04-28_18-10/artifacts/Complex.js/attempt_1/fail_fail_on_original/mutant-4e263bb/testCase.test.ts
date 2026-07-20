import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly for a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.3799528410612945, 10);
    expect(result.im).toBeCloseTo(-0.4023594781085251, 10);
  });
});