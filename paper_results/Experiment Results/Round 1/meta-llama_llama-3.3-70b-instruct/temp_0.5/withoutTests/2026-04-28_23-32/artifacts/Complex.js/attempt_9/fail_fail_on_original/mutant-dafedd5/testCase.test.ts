import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(10.12345, 20.6789);
    const result = complex.ceil(1);
    expect(result.re).toBeCloseTo(11, 0);
    expect(result.im).toBeCloseTo(21, 0);
  });
});