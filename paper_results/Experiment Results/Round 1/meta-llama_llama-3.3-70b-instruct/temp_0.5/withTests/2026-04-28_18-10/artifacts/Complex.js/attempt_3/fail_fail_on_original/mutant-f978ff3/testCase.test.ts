import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const csch = complex.csch();
    expect(csch.re).toBeCloseTo(0.30393100162842646, 10);
    expect(csch.im).toBeCloseTo(-2 * Math.cosh(1) * Math.sin(1) / (Math.cos(2 * 1) - Math.cosh(2 * 1)), 10);
  });
});