import { Complex } from "../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const c = new Complex(1, 1);
    const result = c.sec();
    expect(result.re).toBeCloseTo(0.2658220215477244);
    expect(result.im).toBeCloseTo(-0.363970234211915);
  });
});