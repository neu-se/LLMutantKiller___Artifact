import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the power of two complex numbers correctly', () => {
    const z1 = new Complex(0, 0);
    const z2 = new Complex(1, 0);
    const result = z1.pow(1, 0);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});