import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex string parsing', () => {
  it('should correctly parse negative imaginary unit "-i"', () => {
    const c = new Complex('-i');
    expect(c.re).toBe(0);
    expect(c.im).toBe(-1);
  });
});