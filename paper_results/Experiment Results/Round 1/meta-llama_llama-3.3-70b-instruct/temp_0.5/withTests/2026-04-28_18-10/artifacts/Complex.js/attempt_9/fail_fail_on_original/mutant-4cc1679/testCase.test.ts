import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0.9624236501192069);
    expect(result.im).toBeCloseTo(0);
  });
});