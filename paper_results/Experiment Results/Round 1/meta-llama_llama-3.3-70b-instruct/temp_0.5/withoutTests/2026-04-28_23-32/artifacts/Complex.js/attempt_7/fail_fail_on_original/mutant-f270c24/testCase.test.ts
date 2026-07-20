import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acsch correctly for b = 0', () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should calculate acsch correctly for b !== 0', () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});