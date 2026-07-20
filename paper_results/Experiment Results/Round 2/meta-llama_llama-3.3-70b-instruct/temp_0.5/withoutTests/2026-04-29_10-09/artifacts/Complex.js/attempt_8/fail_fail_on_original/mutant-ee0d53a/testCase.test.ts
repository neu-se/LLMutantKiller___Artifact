import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for numbers where a is less than 3000 and b is greater than 3000', () => {
    const complex = new Complex(1000, 3001);
    const result = complex.log();
    const originalResult = Math.log(Math.sqrt(1000**2 + 3001**2));
    expect(result.re).toBeCloseTo(originalResult, 10);
  });
});