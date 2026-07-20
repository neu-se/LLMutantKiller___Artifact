import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1.9, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.09666339745949285, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});