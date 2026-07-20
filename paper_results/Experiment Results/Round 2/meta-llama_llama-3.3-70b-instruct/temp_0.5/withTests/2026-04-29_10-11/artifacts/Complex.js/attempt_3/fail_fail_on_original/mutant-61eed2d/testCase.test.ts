import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when parsing a string with an empty property name', () => {
    const complex = new Complex('1+2i');
    expect(complex['im']).toBeDefined();
    expect(complex['re']).toBeDefined();
    expect(() => {
      complex[''] = 1;
      expect(complex['']).toBeUndefined();
    }).not.toThrow();
  });
});