import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly floor the complex number', () => {
    const complex = new Complex(12.3456, 7.8901);
    const floored = complex.floor(2);
    expect(floored.re).toBeCloseTo(12.34);
    expect(floored.im).toBeCloseTo(7.89);
  });
});