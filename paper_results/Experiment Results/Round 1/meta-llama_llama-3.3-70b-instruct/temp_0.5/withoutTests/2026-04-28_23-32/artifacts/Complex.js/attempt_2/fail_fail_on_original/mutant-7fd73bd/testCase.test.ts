import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the natural log correctly', () => {
    const complex = new Complex(-1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(Math.log(1));
    expect(result.im).toBeCloseTo(Math.PI);
  });
});