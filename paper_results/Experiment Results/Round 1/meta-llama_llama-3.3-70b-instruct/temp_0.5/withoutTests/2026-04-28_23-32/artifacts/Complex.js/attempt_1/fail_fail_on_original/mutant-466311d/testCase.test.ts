import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(10000, 10000);
    const result = complex.log();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});