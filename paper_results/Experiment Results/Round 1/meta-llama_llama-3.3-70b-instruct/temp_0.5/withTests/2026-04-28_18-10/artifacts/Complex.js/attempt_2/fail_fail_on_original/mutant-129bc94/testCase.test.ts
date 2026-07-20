import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a property that can be accessed with a string key', () => {
    const complex = new Complex(1, 2);
    expect(Object.keys(complex).length).toBeGreaterThan(0);
    expect(complex['re']).toBe(1);
    expect(complex['im']).toBe(2);
  });
});