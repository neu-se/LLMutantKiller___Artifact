import { Complex } from './complex.js';

describe('Complex', () => {
  it('should export Complex when using CommonJS', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(module.exports).toHaveProperty('Complex');
    expect(module.exports).toHaveProperty('default');
  });
});