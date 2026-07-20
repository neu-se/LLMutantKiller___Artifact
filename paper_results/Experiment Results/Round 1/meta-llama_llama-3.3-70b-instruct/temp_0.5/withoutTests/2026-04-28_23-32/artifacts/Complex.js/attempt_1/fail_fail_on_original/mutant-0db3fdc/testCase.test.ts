import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const complex = new Complex(0.1);
    const result = complex.cosm1();
    expect(result).toBeCloseTo(-0.005, 6);
  });
});