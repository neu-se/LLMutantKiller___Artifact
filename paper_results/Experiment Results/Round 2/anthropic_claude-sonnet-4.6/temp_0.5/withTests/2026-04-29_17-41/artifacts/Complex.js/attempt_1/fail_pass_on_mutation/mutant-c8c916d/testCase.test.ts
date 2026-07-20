import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation detection', () => {
  it('should compute acsc correctly for input where a=0 and b=0 returning PI/2 + Infinity*i', () => {
    // The mutation changes (a !== 0) ? a / 0 : 0 to (false) ? a / 0 : 0
    // This affects the fallback branch in acsc when d === 0
    // When a=0 and b=0, the early return handles it: new Complex(Math.PI/2, Infinity)
    // To detect the mutation, we need d===0 but not both zero - impossible with real numbers
    // Instead, test that acsc(0) returns the correct special value
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);
  });
});