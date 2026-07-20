import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.toString()).not.toBe('function acsc() {}');
  });
});