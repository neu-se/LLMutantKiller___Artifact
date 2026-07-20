import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for large numbers', () => {
    const complex = new Complex(3001, 3000);
    const result = complex.log();
    const originalResult = Math.log(Math.sqrt(3001**2 + 3000**2));

    expect(result.re).toBeCloseTo(originalResult, 10);
  });
});