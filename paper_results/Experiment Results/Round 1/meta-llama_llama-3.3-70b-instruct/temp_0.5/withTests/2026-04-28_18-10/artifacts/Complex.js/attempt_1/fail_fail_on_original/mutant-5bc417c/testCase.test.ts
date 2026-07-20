import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acoth function', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(-0.40265318977374244, 10);
    expect(result.im).toBeCloseTo(-0.9159655941772195, 10);
  });
});