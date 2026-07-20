import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result when subtracting Infinity from Infinity', () => {
    const complex1 = new Complex('Infinity');
    const complex2 = new Complex('Infinity');
    expect(complex1.sub(complex2).toString()).toBe('NaN');
    expect(typeof complex1.sub).toBe('function');
    const result = complex1.sub(complex2);
    expect(result).not.toBeUndefined();
    expect(result.toString()).not.toBe('');
  });
});