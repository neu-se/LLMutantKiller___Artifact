import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a property that can be accessed with a string key', () => {
    const complex = new Complex(1, 2);
    expect(complex.constructor.name).toBe('Complex');
    expect(Object.keys(complex)).toContain('re');
    expect(Object.keys(complex)).toContain('im');
  });
});