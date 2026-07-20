import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct acsch value', () => {
    const complex = new Complex(1, 2);
    const acsch = complex.acsch();
    expect(acsch.re).toBeLessThan(0);
    expect(acsch.im).toBeLessThan(0);
  });
});