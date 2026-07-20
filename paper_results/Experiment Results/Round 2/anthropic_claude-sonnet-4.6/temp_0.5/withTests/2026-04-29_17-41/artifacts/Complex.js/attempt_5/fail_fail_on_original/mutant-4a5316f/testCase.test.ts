import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('should compute acoth for small imaginary input via d!=0 path correctly', () => {
    // Use a value small enough to matter but not underflow d
    // a=0, b=1e-160: d = (1e-160)^2 = 1e-320, which is > 0 (no underflow)
    // acoth(0 + 1e-160*i) = atanh(0 - 1e160*i)
    const b = 1e-160;
    const result = new Complex(0, b).acoth();
    // d = b*b = 1e-320 > 0, so d !== 0 path: new Complex(0, -b/d) = new Complex(0, -1/b)
    const expected = new Complex(0, -1 / b).atanh();
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
  });
});