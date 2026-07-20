import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const csch = complex.csch();
    expect(csch.re).toBeCloseTo(0.30393100162842646, 10);
    expect(csch.im).toBeCloseTo(-0.6215180171704285, 10);
  });
});