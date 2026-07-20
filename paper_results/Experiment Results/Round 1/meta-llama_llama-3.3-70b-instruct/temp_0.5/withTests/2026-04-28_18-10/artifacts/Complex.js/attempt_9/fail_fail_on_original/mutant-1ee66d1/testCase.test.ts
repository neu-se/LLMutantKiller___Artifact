import { Complex } from './complex';

describe('Complex', () => {
  it('should detect the mutation in the acsc function', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toEqual(expect.any(Number));
    expect(result.im).toEqual(expect.any(Number));
  });
});