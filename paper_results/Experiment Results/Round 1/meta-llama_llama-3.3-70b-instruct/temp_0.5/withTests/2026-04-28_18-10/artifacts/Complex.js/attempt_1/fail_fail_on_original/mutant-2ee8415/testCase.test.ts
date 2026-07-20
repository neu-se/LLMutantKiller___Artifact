import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).toBeCloseTo(1.4436354751788104);
    expect(result.im).toBeCloseTo(0.7211543476474946);
  });
});