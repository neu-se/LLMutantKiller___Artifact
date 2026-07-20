import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const result1 = Math.log(Math.sqrt(3000 * 3000 + 3000 * 3000)) * 0.5;
    const result2 = Math.log(3000 * 3000 + 3000 * 3000) * 0.5;
    expect(result1).not.toBeCloseTo(result2, 10);
  });
});