import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return correct result for cosm1 function', () => {
    const complex = new Complex(1);
    const result = complex.cosm1(0.1);
    expect(result).toBeCloseTo(-0.005041666666666667);
  });
});