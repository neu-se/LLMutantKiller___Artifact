import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});