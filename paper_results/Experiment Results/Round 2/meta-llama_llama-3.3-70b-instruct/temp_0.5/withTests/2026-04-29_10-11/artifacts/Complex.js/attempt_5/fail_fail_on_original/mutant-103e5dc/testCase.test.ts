import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(0.2755731922038388, 10);
    expect(result.im).toBeCloseTo(-0.482842712474619, 10);
  });
});