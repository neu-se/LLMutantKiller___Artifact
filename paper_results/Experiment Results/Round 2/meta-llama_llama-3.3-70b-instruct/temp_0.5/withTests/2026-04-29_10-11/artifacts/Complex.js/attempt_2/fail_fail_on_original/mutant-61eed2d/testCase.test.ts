import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when parsing a string with an empty property name', () => {
    expect(() => new Complex('1+2i')).not.toThrow();
    expect(() => new Complex('1+2')).not.toThrow();
    expect(() => new Complex('1')).not.toThrow();
    expect(() => {
      const complex = new Complex('1+2i');
      complex[''] = 1;
    }).not.toThrow();
    expect(() => {
      const complex = new Complex('1+2i');
      complex['im'] = 1;
    }).not.toThrow();
    expect(() => {
      const complex = new Complex('1+2i');
      complex['re'] = 1;
    }).not.toThrow();
    expect(() => {
      const complex = new Complex('1+2i');
      complex[''] = 1;
      complex[''] = 2;
    }).not.toThrow();
  });
});