import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should calculate the cosm1 function correctly', () => {
    const x = 0.1;
    const complex = new Complex(x, 0);
    const result = Math.cos(x) - 1;
    const cosm1Result = complex.cosm1();
    expect(cosm1Result).toBeCloseTo(result, 1e-10);
  });
});