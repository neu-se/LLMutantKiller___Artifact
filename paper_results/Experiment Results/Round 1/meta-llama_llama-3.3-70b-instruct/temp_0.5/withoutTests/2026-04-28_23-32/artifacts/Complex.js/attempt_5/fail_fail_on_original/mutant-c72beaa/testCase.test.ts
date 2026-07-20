import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acot correctly for a !== 0 and b === 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});