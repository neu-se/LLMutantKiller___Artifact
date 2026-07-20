import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech with NaN input', () => {
  it('should propagate NaN correctly in asech when imaginary part is NaN', () => {
    const c = new Complex(NaN, 5);
    const result = c.asech();
    expect(isNaN(result.im)).toBe(true);
  });
});