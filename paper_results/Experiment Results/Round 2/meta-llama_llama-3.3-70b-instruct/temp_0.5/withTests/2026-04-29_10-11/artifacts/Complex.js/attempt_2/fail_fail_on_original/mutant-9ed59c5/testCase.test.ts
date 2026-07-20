import { Complex } from './complex.js';

describe('Complex', () => {
  it('should export Complex as a module', () => {
    expect(typeof Complex).toBe('function');
    expect(Complex.__esModule).toBe(true);
    expect(Complex.default).toBe(Complex);
    expect(Complex.Complex).toBe(Complex);
  });
});