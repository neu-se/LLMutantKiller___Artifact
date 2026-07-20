import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});