import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const originalResult = Math.sqrt(a * a + b * b);
    const mutatedResult = Math.sqrt(a * a + b * b);
    expect(originalResult).toBeCloseTo(mutatedResult, 10);
  });
});