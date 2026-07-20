import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a property with its own name', () => {
    const keys = Object.keys(Complex);
    expect(keys.includes('Complex')).toBe(true);
  });
});