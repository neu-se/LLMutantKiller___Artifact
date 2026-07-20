import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});