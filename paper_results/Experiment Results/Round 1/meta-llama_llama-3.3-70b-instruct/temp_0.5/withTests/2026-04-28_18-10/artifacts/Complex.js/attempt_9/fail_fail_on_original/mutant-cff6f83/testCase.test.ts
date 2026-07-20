import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.2231435513, 5);
    expect(result.im).toBeCloseTo(-1.317304243, 5);
  });
});