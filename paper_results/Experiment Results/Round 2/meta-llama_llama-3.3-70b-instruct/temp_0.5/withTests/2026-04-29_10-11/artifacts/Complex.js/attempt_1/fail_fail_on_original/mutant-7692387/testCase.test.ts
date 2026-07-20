import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(1.4436354751788104, 10);
    expect(result.im).toBeCloseTo(1.5707963267948966, 10);
  });
});