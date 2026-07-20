import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex div', () => {
  it('correctly divides with large equal-magnitude divisor components', () => {
    const result = new Complex(1, 1).div(new Complex(1e308, -1e308));
    expect(1 / result.re).toBe(Infinity);
  });
});