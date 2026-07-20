import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for large numbers', () => {
    const complex = new Complex(3001, 3000);
    const result1 = complex.log();
    const originalResult = Math.log(Math.sqrt(3001**2 + 3000**2));

    const complex2 = new Complex(3000, 3001);
    const result2 = complex2.log();
    const originalResult2 = Math.log(Math.sqrt(3000**2 + 3001**2));

    expect(result1.re).toBeCloseTo(originalResult, 10);
    expect(result2.re).toBeCloseTo(originalResult2, 10);
  });
});