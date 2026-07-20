import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(1, 0);
    const acosh = complex.acosh();
    expect(acosh.re).toBeCloseTo(0, 3);
    expect(acosh.im).toBeCloseTo(0, 3);
  });
});