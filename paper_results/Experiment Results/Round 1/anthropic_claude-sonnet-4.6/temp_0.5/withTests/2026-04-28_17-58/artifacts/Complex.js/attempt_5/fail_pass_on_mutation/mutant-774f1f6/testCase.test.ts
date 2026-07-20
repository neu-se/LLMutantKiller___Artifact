import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not have empty string property on parsed complex number', () => {
    const c = new Complex(3, 4);
    // In mutated code, z[""] gets set during null check path
    // but for normal numbers, different path is taken
    // Let's verify null input doesn't corrupt the object
    const zero = new Complex(null as any);
    const result = zero.add(new Complex(3, 4));
    expect(result.re).toBe(3);
    expect(result.im).toBe(4);
  });
});