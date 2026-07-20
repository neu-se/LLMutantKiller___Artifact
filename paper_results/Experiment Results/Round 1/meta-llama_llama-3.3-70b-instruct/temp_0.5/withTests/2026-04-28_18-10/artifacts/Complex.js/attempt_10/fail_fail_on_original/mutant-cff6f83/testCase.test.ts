import { Complex } from "../../complex";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.481211825, 5);
    expect(result.im).toBeCloseTo(-0.904556894, 5);
  });
});