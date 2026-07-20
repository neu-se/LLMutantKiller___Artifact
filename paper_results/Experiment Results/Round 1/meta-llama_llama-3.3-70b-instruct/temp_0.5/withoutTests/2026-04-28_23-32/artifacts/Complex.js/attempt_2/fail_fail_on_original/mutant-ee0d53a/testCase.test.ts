import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(3001, 3001);
    const logHypotResult = complex.log();
    const manualCalculation = Math.log(Math.sqrt(3001 * 3001 + 3001 * 3001));
    expect(logHypotResult.re).toBeCloseTo(manualCalculation, 10);
  });
});