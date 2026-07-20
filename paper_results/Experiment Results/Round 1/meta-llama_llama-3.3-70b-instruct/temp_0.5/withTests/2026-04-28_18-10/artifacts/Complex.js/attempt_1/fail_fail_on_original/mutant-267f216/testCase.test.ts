import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.20273255405408223, 10);
    expect(result.im).toBeCloseTo(-2.945460087626998, 10);
  });
});