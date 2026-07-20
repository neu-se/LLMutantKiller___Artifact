import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for large numbers', () => {
    const c = new Complex(3001, 3001);
    const result = c.logHypot();
    expect(result).toBeCloseTo(Math.log(Math.sqrt(3001*3001 + 3001*3001)), 10);
  });
});