import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the cosecans of a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(-0.2172398975974618);
    expect(result.im).toBeCloseTo(-0.2172398975974618);
  });
});