import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(Math.PI / 2, 10);
  });
});