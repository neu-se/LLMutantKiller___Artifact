import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('coth and acoth are inverse operations for non-trivial values', () => {
    // Test that acoth(coth(z)) = z for z = 2+0i
    const z = new Complex(2, 0);
    const cothZ = z.coth();
    const result = cothZ.acoth();
    expect(result.re).toBeCloseTo(2, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});