import { Complex } from './complex.js';

describe('Complex number parsing', () => {
  it('should not throw an error for default case', () => {
    const result = new Complex({ foo: 'bar' });
    expect(result).not.toBeUndefined();
  });
});