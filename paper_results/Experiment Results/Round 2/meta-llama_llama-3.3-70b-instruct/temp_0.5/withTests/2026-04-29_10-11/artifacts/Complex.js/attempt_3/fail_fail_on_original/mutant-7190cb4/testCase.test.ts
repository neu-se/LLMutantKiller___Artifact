import { Complex } from "./complex";

describe('Complex', () => {
  it('should handle complex acsc calculation correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});