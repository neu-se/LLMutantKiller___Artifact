import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.log();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});