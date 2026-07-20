import { Complex } from './complex.js';

describe('Complex', () => {
  it('should create a complex number with the correct imaginary part when parsing a string', () => {
    const complex = new Complex('1+2i');
    expect(complex['re']).toBeDefined();
    expect(complex['im']).toBeDefined();
    expect(complex['re']).toBe(1);
    expect(complex['im']).toBe(2);
  });
});