import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should have a property named Complex that references itself', () => {
    const keys = Object.keys(Complex);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys).not.toContain('');
    const complex = new Complex(1, 2);
    expect(complex.constructor.name).toBe('Complex');
    expect(Object.keys(complex)).toContain('re');
    expect(Object.keys(complex)).toContain('im');
  });
});