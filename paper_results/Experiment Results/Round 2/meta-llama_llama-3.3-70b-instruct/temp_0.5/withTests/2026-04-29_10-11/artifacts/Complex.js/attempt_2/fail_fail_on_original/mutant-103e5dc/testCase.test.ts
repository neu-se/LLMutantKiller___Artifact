import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(0.01123595505617978, 10);
    expect(result.im).toBeCloseTo(-0.02247191011235956, 10);
  });
});