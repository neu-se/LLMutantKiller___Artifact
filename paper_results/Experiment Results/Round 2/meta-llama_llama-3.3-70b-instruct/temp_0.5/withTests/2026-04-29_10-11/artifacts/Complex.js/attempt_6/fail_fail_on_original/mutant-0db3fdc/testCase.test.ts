import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate cosm1', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected)).toBeLessThan(1e-10);
    const xSmall = 0.000001;
    const complexSmall = new Complex(xSmall);
    const resultSmall = complexSmall.cosm1();
    const expectedSmall = Math.cos(xSmall) - 1;
    expect(Math.abs(resultSmall - expectedSmall)).toBeLessThan(1e-10);
  });
});