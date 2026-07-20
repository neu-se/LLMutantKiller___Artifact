import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
    expect(Object.keys(result)).toEqual(['re', 'im']);
  });
});