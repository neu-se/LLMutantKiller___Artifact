import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should return -Infinity imaginary part for atan of (0, -1) and be usable in further calculations', () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    // Verify the result can be used in add without producing NaN
    const added = result.add(new Complex(1, 0));
    expect(added.isInfinite()).toBe(true);
    expect(added.isNaN()).toBe(false);
  });
});