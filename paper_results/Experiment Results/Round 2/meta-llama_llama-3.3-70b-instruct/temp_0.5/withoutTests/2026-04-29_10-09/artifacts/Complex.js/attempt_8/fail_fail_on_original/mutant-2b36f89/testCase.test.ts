import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(0.1, 0.1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(2 * (1.0050346138658775), 4);
    expect(result.im).toBeCloseTo(-2 * (0.10033467108589734), 4);
  });
});