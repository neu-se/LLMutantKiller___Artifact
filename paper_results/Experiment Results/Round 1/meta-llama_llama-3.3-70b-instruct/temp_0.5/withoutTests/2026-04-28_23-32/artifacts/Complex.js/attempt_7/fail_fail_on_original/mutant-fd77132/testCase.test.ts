import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have a function asec that is not empty', () => {
    const c = new Complex(1, 1);
    const asecFunc = c.constructor.prototype.asec;
    expect(asecFunc.toString()).not.toBe('function asec() {}');
  });
});