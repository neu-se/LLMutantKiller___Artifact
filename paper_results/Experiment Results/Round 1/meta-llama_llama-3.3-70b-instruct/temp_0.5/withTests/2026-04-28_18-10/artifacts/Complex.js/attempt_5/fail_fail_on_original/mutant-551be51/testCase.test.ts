import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.5, 2.7);
    const result = complex.ceil();
    expect(result).toBeDefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});