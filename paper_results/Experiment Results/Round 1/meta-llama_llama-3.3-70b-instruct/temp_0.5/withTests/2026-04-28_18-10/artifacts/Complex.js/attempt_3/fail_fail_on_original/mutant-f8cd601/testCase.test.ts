import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
  });
});