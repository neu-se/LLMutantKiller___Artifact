import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec', () => {
  it('asec(0+i) should have infinite imaginary part', () => {
    const result = new Complex(0, 1).asec();
    expect(result.im).toBe(Infinity);
  });
});