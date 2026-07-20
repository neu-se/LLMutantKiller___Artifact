import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex div', () => {
  it('division result sign is correct for equal magnitude divisor components', () => {
    const result = new Complex(0, 0).div(new Complex(1, -1));
    // The real part should be +0, not -0
    // We can detect this by checking 1/result.re
    expect(1 / result.re).toBe(Infinity); // +0 gives Infinity, -0 gives -Infinity
  });
});