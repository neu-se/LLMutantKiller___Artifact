import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should compute asec of a complex number with nonzero imaginary part correctly', () => {
    // asec(1 + i): uses both re and im parts
    const c = new Complex(1, 1);
    const result = c.asec();
    // acos(1/(1+i)) = acos((1-i)/2)
    // Expected values computed from the formula
    expect(result.re).toBeCloseTo(1.1185178796437059, 8);
    expect(result.im).toBeCloseTo(-0.5306375309525178, 8);
  });
});