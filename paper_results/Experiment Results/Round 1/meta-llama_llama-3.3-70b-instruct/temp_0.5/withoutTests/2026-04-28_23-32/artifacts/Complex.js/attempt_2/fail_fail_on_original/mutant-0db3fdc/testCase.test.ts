import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.cosm1();
    const originalResult = -0.00006103515625;
    expect(result).toBeCloseTo(originalResult, 15);
  });
});