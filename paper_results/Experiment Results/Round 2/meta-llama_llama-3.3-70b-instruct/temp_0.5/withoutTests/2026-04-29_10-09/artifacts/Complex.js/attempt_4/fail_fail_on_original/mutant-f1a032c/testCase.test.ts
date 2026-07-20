import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should floor the imaginary part correctly', () => {
    const complex = new Complex(3.14159, 2.71828);
    const floored = complex.floor(2);
    expect(floored.im).toBeCloseTo(2.72, 2);
    expect(floored.im).not.toBeNaN();
  });
});