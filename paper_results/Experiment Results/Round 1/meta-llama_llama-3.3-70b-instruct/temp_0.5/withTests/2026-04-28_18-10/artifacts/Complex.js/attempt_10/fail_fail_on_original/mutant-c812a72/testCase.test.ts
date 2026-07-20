import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should round complex number correctly', () => {
    const complex = new Complex(1.2345, 2.3456);
    const rounded = complex.round(2);
    expect(rounded.re).toBeCloseTo(1.23, 2);
    expect(rounded.im).toBeCloseTo(2.35, 2);
    expect(complex.round(2)).not.toBeNaN();
  });
});