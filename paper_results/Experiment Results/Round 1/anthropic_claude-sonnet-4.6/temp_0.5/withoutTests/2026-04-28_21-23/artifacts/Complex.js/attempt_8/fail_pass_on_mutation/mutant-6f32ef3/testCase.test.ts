import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format toString for number with a=0 and b=0 produced by computation', () => {
    // Use inverse of infinity which gives ZERO
    const c = Complex.INFINITY.inverse();
    expect(c.toString()).toBe('0');
  });
});