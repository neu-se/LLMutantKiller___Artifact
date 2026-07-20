import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a valid result when calculating asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).toBeCloseTo(1.4436354751788103);
    expect(result.im).toBeCloseTo(0.7211066038156427);
  });
});