import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acot correctly for a = 0 and b = 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.PI / 2, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });

  it('should calculate acot correctly for a = 1 and b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });

  it('should calculate acot correctly for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(-Math.PI / 2, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});