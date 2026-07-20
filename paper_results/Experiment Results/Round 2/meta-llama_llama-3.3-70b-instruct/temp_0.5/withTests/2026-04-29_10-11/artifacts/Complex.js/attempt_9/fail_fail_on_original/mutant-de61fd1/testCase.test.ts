import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(-0.5, 10);
  });
});