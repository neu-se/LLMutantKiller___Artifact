import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation detection', () => {
  it('should produce negative imaginary component when both parts are tiny positive values causing d to underflow', () => {
    const tiny = Number.MIN_VALUE;
    const result = new Complex(tiny, tiny).acsc();
    // With original code: imaginary part of asin(Infinity - Infinity*i) differs from asin(Infinity + Infinity*i)
    expect(result.im).toBeLessThan(0);
  });
});