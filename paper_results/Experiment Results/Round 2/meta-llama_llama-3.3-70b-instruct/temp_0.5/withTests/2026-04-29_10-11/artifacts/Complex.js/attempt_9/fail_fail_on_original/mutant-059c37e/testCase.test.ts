import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should return the correct value for atan when the input is -i', () => {
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(result.im).not.toBeCloseTo(Infinity);
  });
});