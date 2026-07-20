import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a defined property "im" when parsing a string', () => {
    const complex = new Complex('1+2i');
    expect(complex['im']).toBeDefined();
    expect(complex['im']).not.toBeUndefined();
    expect(complex['im']).not.toBeNull();
  });
});