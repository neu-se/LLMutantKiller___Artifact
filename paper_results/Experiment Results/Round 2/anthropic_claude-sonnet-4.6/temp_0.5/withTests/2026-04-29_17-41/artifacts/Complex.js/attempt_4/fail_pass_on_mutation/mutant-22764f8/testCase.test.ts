import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should compute asec(1+i) with correct real and imaginary parts', () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(1.1185178796437059, 8);
    expect(result.im).toBeCloseTo(0.5306375309525179, 8);
  });
});