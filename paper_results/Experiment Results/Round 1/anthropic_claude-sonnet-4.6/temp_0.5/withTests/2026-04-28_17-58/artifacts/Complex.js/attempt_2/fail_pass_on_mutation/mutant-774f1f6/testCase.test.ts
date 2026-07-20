import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex null parsing', () => {
  it('should not set empty string property when parsing null', () => {
    const c = new Complex(null as any);
    expect(Object.prototype.hasOwnProperty.call(c, '')).toBe(false);
  });
});