import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct result when subtracting Infinity from Infinity', () => {
    const complex1 = new Complex('Infinity');
    const complex2 = new Complex('Infinity');
    const result = complex1.sub(complex2);
    expect(result.toString()).toBe('NaN');
    expect(complex1.sub.toString()).toBe('function');
    expect(typeof complex1.sub).toBe('function');
    expect(complex1.sub.name).toBe('sub');
  });
});